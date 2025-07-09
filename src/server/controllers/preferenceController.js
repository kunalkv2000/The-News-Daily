import Preference from '../models/Preference.js';
import News from '../models/news.js';
import axios from 'axios';
import sendEmail from '../utils/sendEmail.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';



export const fetchNewsByCategories = async (categories) => {
  const newsAPIKey = process.env.NEWS_API_KEY;
  const articles = [];

  // console.log('News API Key:', process.env.NEWS_API_KEY); 
  try {
    // Batch fetch news articles for categories
    const requests = categories.map((category) =>
      // axios.get('https://newsapi.org/v2/top-headlines', {
    axios.get(process.env.NEWS_API_URL, {
        params: {
          category,
          apiKey: newsAPIKey,
          pageSize: 5, // Limit articles per category
        },
      })
    );

    const responses = await Promise.all(requests);

    // Consolidate all articles
    for (const response of responses) {
      if (response.data.articles) {
        articles.push(...response.data.articles);
      }
    }

    return articles;
  } catch (error) {
    console.error('Error fetching news:', error.message);
    return [];
  }
};



// Update user preferences
export const updatePreference = async (req, res) => {
  const { userId } = req.params; // User ID passed in the URL
  const { categories, notificationChannels, theme, frequency } = req.body;

    // Make sure the user is authenticated
    if (req.user.id !== userId) {
      return res.status(403).json({ error: 'You are not authorized to update these preferences.' });
    }

  try {
    // Validate categories input
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ error: 'At least one category is required.' });
    }

    // Fetch the user
    const CurrentUser = await User.findById(userId);
    if (!CurrentUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // console.log('User found:', CurrentUser);

    // Fetch the existing preferences or create a new one
    let preference = await Preference.findOne({ user: userId });

    if (!preference) {
      // Create a new preference document
      preference = new Preference({
        user: userId,
        categories,
        notificationChannels: {
          email: notificationChannels.email || true, // Ensure notifications is an object with email
        },
        theme,
        frequency:frequency || 'daily',
      });
    } else {
      // Update the existing preference fields
      preference.categories = categories;
      preference.notificationChannels = {
        email: notificationChannels.email || preference.notificationChannels.email, // Update email if it's provided
      };
      preference.theme = theme;
      preference.frequency = frequency || preference.frequency;
    }

    // Save the preference document
    await preference.save();
    // console.log('Updated Preference:', preference);

    // Generate the unsubscribe token
    const unsubscribeToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Prepare the email content with the unsubscribe button
    const emailContent = `
      Hello ${CurrentUser.name},<br>
      You have successfully subscribed to the following categories: ${categories.join(', ')}.<br><br>
      If you'd like to unsubscribe from these updates, please click the button below:<br><br>
      <a href="${process.env.FRONTEND_URL}/unsubscribe/${userId}?token=${unsubscribeToken}" 
         target="_blank" 
         style="background-color: #f44336; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Unsubscribe
      </a><br><br>
      Regards,<br>Your News Alert System
    `;

    // Send the confirmation email with the unsubscribe button
    try {
      await sendEmail(
        CurrentUser.email,
        'Preference Updated and Subscription Activated',
        emailContent
      );
    } catch (emailErr) {
      console.error('Error sending email:', emailErr.message);
    }

    

    res.status(200).json({
      message: 'Preferences updated successfully.',
      preference,
    });
  } catch (err) {
    console.error('Error updating preferences:', err.message);
    res.status(500).json({ error: 'Failed to update preferences.' });
  }
};





export const getNewsAlerts = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find user preferences
    const preference = await Preference.findOne({ user: userId }).populate('user');

    console.log(preference);

    if (!preference) {
      return res.status(404).json({ error: 'Preferences not found for this user.' });
    }

    const { categories, notificationChannels, frequency } = preference;

    // Fetch news articles based on categories
    const articles = await fetchNewsByCategories(categories);

    // Ensure the user's email is populated
    if (!preference.user || !preference.user.email) {
      return res.status(404).json({ error: 'User email not found.' });
    }

    if (articles.length === 0) {
      return res.status(404).json({ message: 'No news found for the selected categories.' });
    }


  


    const categoryLinks = categories.map(category => {
      const url = `${process.env.NEWS_API_URL}?category=${category}&apiKey=${process.env.NEWS_API_KEY}`;
      return `<a href="${url}" target="_blank">Latest ${category} news</a>`;
    }).join('<br>');

    // Prepare the email content
    const emailSubject = 'New News Alerts Based on Your Preferences';
    const emailContent = `
      <p>Hello ${preference.user.name},</p>
      <p>New updates are available for the categories you selected. Click the links below to visit the latest news updates:</p>
      <p>${categoryLinks}</p>
      <br>
      <p>Regards,<br>Your News Alert System</p>
    `;

    // Check if email notifications are enabled
    if (notificationChannels && notificationChannels.email) {
      // Use your sendEmail function to send the email
      await sendEmail(preference.user.email, emailSubject, emailContent);
      // console.log(`Email sent to ${preference.user.email}`);
    }

    res.status(200).json({
      message: 'News alerts fetched successfully and notifications sent (if enabled).',
      articles,
    });
  } catch (err) {
    console.error('Error fetching news alerts:', err.message);
    res.status(500).json({ error: 'Failed to fetch news alerts.' });
  }
};

//unsubscribe news categories


export const unsubscribe =  async (req, res) => {
  const { userId } = req.params;
  const { token } = req.query;
  // console.log(`Unsubscribe request for userId: ${userId}, token: ${token}`);

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // console.log('Decoded token:', decoded); 

    if (decoded.userId !== userId) {
      console.log('Token mismatch: expected userId does not match decoded userId');
      return res.status(400).json({ error: 'Invalid token' });
    }

    // Fetch the user preferences
    const preference = await Preference.findOne({ user: userId }).populate('user');
    console.log('Fetched preference:', preference);  

    if (!preference) {
      // console.log('No preferences found for userId:', userId);
      return res.status(404).json({ error: 'Preferences not found' });
     
    }

    // Remove the selected categories and disable email notifications
    // preference.categories = [];
  

    // Optionally, you can log this event or track the unsubscribes for analytics

    // Send an email to notify the user that they have unsubscribed
    const emailSubject = "Unsubscribed from News Alerts";
    const emailContent = `
      Hello ${preference.user.name},<br><br>
      You have been unsubscribed from the news alerts. No further email alerts will be sent for your selected categories.<br><br>
      Regards,<br>Your News Alert System
    `;
    
    // Send the email
    await sendEmail(
      preference.user.email,
      emailSubject,
      emailContent
    ).catch((error) => {
      console.error('Error sending unsubscribe email:', error.message);
    });

    preference.notificationChannels.email = false;

    // Save the updated preferences
    await preference.save();

    res.status(200).json({
      message: 'You have been unsubscribed successfully. No further email alerts will be sent.',
    });
  } catch (error) {
    console.error('Error unsubscribing:', error.message);
    res.status(500).json({ error: 'Failed to unsubscribe.' });
  }
};

