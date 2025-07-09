import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";

const NewsList = ({ category }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        // const response = await axios.get(
        //   `http://localhost:5000/api/news?category=${category}`
        // );

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/news?category=${category}`
        );

        setNewsArticles(response.data);
        // console.log(newsArticles, "Fetched news articles in NewsList");
      } catch (err) {
        setError(err.message || "An error occurred while fetching news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {newsArticles.map((article) => (
        <NewsCard
          key={article._id} // Use `_id` from the backend MongoDB
          title={article.title}
          image={article.image}
          description={article.description}
          link={article.url}
        />
      ))}
    </div>
  );
};

export default NewsList;
