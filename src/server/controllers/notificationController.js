
import User from "../models/User.js";
import Preference from "../models/Preference.js";
import sendEmail from "../utils/sendEmail.js";
import { sendNewsAlert } from "../utils/sendEmail.js";


// Controller for subscribing to categories
const subscribeToCategories = async (req, res) => {
  const { email, categories } = req.body;

  if (!email || !categories || categories.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  try {
    // Validate categories (you can adjust this validation based on your needs)
    const validCategories = ['sports', 'technology', 'business', 'entertainment']; // Example categories
    const invalidCategories = categories.filter(category => !validCategories.includes(category));
    
    if (invalidCategories.length > 0) {
      return res.status(400).json({ success: false, message: `Invalid categories: ${invalidCategories.join(', ')}` });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if preferences exist for the user, else create a new one
    let preference = await Preference.findOne({ user: user._id });
    if (!preference) {
      preference = new Preference({ user: user._id });
    }

    // Update the preferences with new categories
    preference.categories = categories;
    await preference.save();

    // Send confirmation email
    await sendEmail(
      email,
      "Preference Updated and Subscription Activated",
      `You have successfully subscribed to the following categories: ${categories.join(", ")}`
    );

    res.status(200).json({ success: true, message: "Preference Updated and Subscription Activated" });
  } catch (error) {
    console.error("Error activating subscription:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Controller for processing news alerts
const processNewsAlerts = async (req, res) => {
  const { user, newsUpdates } = req.body;

  if (!user || !user.email || !newsUpdates || newsUpdates.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid data' });
  }

  try {
    // Find the preferences of the user
    const preference = await Preference.findOne({ user: user._id });
    if (!preference || !preference.categories || preference.categories.length === 0) {
      return res.status(400).json({ success: false, message: 'User has no valid categories subscribed' });
    }

    // Filter news updates to match user's subscribed categories
    const filteredNewsUpdates = newsUpdates.filter(news => preference.categories.includes(news.category));

    if (filteredNewsUpdates.length === 0) {
      return res.status(400).json({ success: false, message: 'No news updates found for subscribed categories' });
    }

    // Send news alerts
    const result = await sendNewsAlert(user, filteredNewsUpdates);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error processing news alerts:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export {
  subscribeToCategories,
  processNewsAlerts,
};


