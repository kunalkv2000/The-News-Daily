import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

// Create the GlobalStateContext
const GlobalStateContext = createContext();

// Custom hook to use the GlobalStateContext
export const useGlobalStateContext = () => {
  return useContext(GlobalStateContext);
};

// GlobalStateProvider component to wrap the application and manage global state
export const GlobalStateProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    categories: ["Sports", "Technology", "Business", "Entertainment"],
    frequency: "daily",
    notificationChannels: {
      email: true,
    },
  });

  const [newsData, setNewsData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'))

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  // const BASE_URL = 'https://newsapi.org/v2/top-headlines';
  const BASE_URL = import.meta.env.VITE_NEWS_API_URL;

  // Function to update user preferences
  const updatePreferences = (newPreferences) => {
    setPreferences((prevState) => ({ ...prevState, ...newPreferences }));
  };

  const fetchNewsData = useCallback(async () => {
    const selectedCategory = preferences.categories[0];
    const cacheKey = `news-${selectedCategory}`;

    // Check if data for the selected category is cached
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      setNewsData(JSON.parse(cachedData)); // Set the cached data into the state
      return;
    }

    // If no data in cache, fetch from API
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}?category=${selectedCategory}&apikey=${API_KEY}`
      );

      // Cache the response data
      localStorage.setItem(cacheKey, JSON.stringify(response.data.articles));
      setNewsData(response.data.articles); // Set the fetched data into the state
    } catch (error) {
      console.error("Error fetching news data:", error);
    } finally {
      setLoading(false);
    }
  }, [preferences.categories]);

  // Function to add a notification
  const addNotification = (message, type = "info") => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
    };
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);

    // Automatically remove the notification after 5 seconds
    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== newNotification.id
        )
      );
    }, 5000);
  };

  // Fetch news when preferences change
  useEffect(() => {
    fetchNewsData();
  }, [preferences]);

  return (
    <GlobalStateContext.Provider
      value={{
        preferences,
        setPreferences,
        newsData,
        notifications,
        updatePreferences,
        fetchNewsData,
        addNotification,
        // user,
        // setUser,
        loading,
        setNewsData,
        setLoading,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
