import express from 'express';

import { fetchByCategory } from '../controllers/newsController.js';


const router = express.Router();




// Route to fetch news by category
router.get('/news', async (req, res) => {
    const { category } = req.query; // Get category from query params
    console.log(`Fetching news for category: ${category}`);
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }
  
    try {
      // Fetch news based on category
      const newsArticles = await fetchByCategory(category);
      if (newsArticles.length === 0) {
        console.log(`No news found for category: ${category}`);
        return res.status(404).json({ message: 'No news found for this category' });
      }
      console.log(`Fetched ${newsArticles.length} articles for category: ${category}`);
      return res.json(newsArticles);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });

export default router;
