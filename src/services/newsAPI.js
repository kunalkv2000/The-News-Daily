import axios from 'axios';
import News from '../models/News.js';   // Assuming you have a News model for storing articles
import dotenv from 'dotenv';


dotenv.config();

const newsAPIKey = process.env.VITE_NEWS_API_KEY; // API Key for news source (e.g., NewsAPI)

const fetchNews = async (category = "general") => {
  try {
    // const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      const response = await axios.get(`${process.env.NEWS_API_URL}`, {
      params: {
        category,
        apiKey: newsAPIKey,
        pageSize: 10, // Limit the number of news articles
      },
    });

    if (response.data.articles && response.data.articles.length > 0) {
      // Store articles in MongoDB
      const articles = response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source.name,
        image: article.urlToImage,
        publishedAt: article.publishedAt,
        category,
      }));

      // Insert the aggregated articles into the database
      await News.insertMany(articles);
    }
  } catch (err) {
    console.error("Error fetching news:", err);
    throw new Error("Failed to fetch news.");
  }
};

export default { fetchNews };
