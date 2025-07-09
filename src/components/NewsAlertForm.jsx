import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsAlertForm = () => {
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState([]);
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const newsApiKey = import.meta.env.VITE_NEWS_API_KEY; // Get the API key from the .env file
  // const newsApiBaseUrl = "https://newsapi.org/v2/top-headlines";
  const newsApiBaseUrl = import.meta.env.VITE_NEWS_API_URL;

  // Fetch news updates based on selected categories
  const fetchNewsUpdates = async () => {
    if (categories.length === 0) {
      setNewsUpdates([]); // No categories selected, clear news updates
      return;
    }
    setLoading(true);
    try {
      const categoryParams = categories.join(",");
      const response = await axios.get(newsApiBaseUrl, {
        params: {
          apiKey: newsApiKey,
          category: categoryParams, // Categories are passed as a comma-separated string
          country: "us", // Change to preferred country (default: US)
        },
      });
      setNewsUpdates(response.data.articles); // Set the fetched news articles
    } catch (error) {
      console.error("Error fetching news updates:", error);
      setMessage("Failed to fetch news updates.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger news updates fetch when categories change
  useEffect(() => {
    fetchNewsUpdates();
  }, [categories]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || categories.length === 0 || newsUpdates.length === 0) {
      setMessage("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      // const response = await axios.post("http://localhost:5000/api/notifications/news-alerts", {

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/notifications/news-alerts`,
        {
        user: {
          email,
          categories, // The categories the user is subscribed to
          notificationChannels: ["email"], // Assuming email is the only notification method
        },
        newsUpdates,
      });

      if (response.data.success) {
        setMessage("News alerts sent successfully!");
      } else {
        setMessage("No relevant updates available.");
      }
    } catch (error) {
      console.error("Error sending news alerts:", error);
      setMessage("Failed to send news alerts.");
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setCategories(selectedCategories);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Send News Alerts</h2>

      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 w-full border rounded-lg"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Category selection */}
        <div className="mb-4">
          <label htmlFor="categories" className="block text-lg">Select Categories:</label>
          <select
            id="categories"
            multiple
            value={categories}
            onChange={handleCategoryChange}
            className="p-2 w-full border rounded-lg"
            required
          >
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="general">General</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>

        {/* News updates display */}
        <div className="mb-4">
          <label className="block text-lg">News Updates:</label>
          <div className="space-y-2">
            {loading ? (
              <p>Loading news updates...</p>
            ) : (
              newsUpdates
                .map((news, index) => (
                  <div key={index} className="p-2 border rounded-lg">
                    <h3 className="font-bold">{news.title}</h3>
                    <p>{news.description}</p>
                    <p className="text-sm text-gray-500">Source: {news.source.name}</p>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg" disabled={loading}>
          {loading ? "Sending..." : "Send News Alerts"}
        </button>
      </form>

      {/* Feedback message */}
      {message && <p className="mt-4 text-lg text-center">{message}</p>}
    </div>
  );
};

export default NewsAlertForm;
