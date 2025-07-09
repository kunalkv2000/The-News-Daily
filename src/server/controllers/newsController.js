import News from '../models/news.js';
import axios from 'axios';

// Fetch and store all news
export const fetchAllNews = async (req, res) => {
  const { category = 'sports', apiKey } = req.query;  // Get apiKey from query parameters

  if (!apiKey) {
    return res.status(400).json({ error: 'API key is missing' });
  }

  try {
    // const response = await axios.get('https://newsapi.org/v2/top-headlines', {

    const response = await axios.get(`${process.env.NEWS_API_URL}`, {
      params: {
        category,
        apiKey: apiKey,  // Pass the apiKey to NewsAPI request
        pageSize: 20, // Adjust as needed
      },
    });

    // console.log('NewsAPI Response:', response.data);

    if (response.data.articles) {
      const articles = response.data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source.name,
        image: article.urlToImage,
        publishedAt: article.publishedAt,
        category,
      }));

      // Save to the database
      await News.insertMany(articles);

      res.status(200).json({ message: 'News fetched and stored successfully.' });
    } else {
      console.log('No articles found');
      res.status(404).json({ message: 'No news articles found.' });
    }
  } catch (err) {
    console.error('Error fetching news:', err);
    
    res.status(500).json({ error: 'Failed to fetch news.' });
  }
};


// Get all stored news
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 }); // Latest first
    res.status(200).json(news);
  } catch (err) {
    console.error('Error retrieving news:', err);
    res.status(500).json({ error: 'Failed to retrieve news.' });
  }
};



export const fetchByCategory = async (category) => {
  const newsAPIKey = process.env.NEWS_API_KEY; // Store your API key in an env file
  const articles = [];

  try {
    // Fetch news articles for the selected category
    // const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      const response = await axios.get(`${process.env.NEWS_API_URL}`, {
      params: {
        category,
        apikey: newsAPIKey,
        pageSize: 9, // Limit articles per category
      },
    });
console.log("newsdata fetched from backend");
    // Check if the response contains articles
    if (response.data.articles) {
      // Iterate over articles and save to database if they are not already present
      for (const article of response.data.articles) {
        const { title, description, url, source, image, publishedAt } = article;

        // const image = urlToImage || 'https://default-image-url.com/default-image.jpg';
        const articleImage = image || 'https://default-image-url.com/default-image.jpg';

        // Check if article already exists in the database (to prevent duplicates)
        let existingArticle = await News.findOne({ title });
        if (!existingArticle) {
          const newArticle = new News({
            title,
            description,
            url,
            source: source.name,
            image: articleImage,
            publishedAt,
            category,
          });
          console.log('Full Article Object:', article);
          // console.log('Article Image URL:', article.urlToImage);
          // console.log('Article Image URL:', urlToImage || 'No image available');
          // console.log('Article Image URL:', articleImage);

          // Save the article to the database
          await newArticle.save();
          articles.push(newArticle);
        } else {
          // If the article already exists, just add it to the list
          articles.push(existingArticle);
          console.log('Article already exists in the database:', title);
        }
      }
    }


    return articles; // Return the list of articles
  } catch (error) {
    console.error('Error fetching news:', error.message);
    return [];
  }
};
