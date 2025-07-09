// utils/helpers.js

// Function to format dates in a readable format (e.g., "Dec 10, 2024")
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Function to filter news articles by category
  const filterNewsByCategory = (newsArray, category) => {
    return newsArray.filter((newsItem) => newsItem.category === category);
  };
  
  // Function to truncate long text (for news description preview)
  const truncateText = (text, maxLength = 150) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  
 export default { formatDate, filterNewsByCategory, truncateText };
  