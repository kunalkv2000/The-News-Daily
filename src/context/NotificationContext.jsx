import React, { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};





export const NotificationProvider = ({ children }) => {

  const [emailProviderStatus, setEmailProviderStatus] = useState(null);
  // User preferences state

  const [preferences, setPreferences] = useState({
    categories: ["Sports", "Technology"],
    frequency: "daily",
    notificationChannels: {
      email: true, 
  },
  });




 

  // Notifications state (for managing toasts)
  const [notifications, setNotifications] = useState([]);

  // Loading state (to manage async states)
  const [loading, setLoading] = useState(false);

  

  // // Function to update user preferences

  const updatePreferences = (newPreferences) => {
    setPreferences(newPreferences);  // Ensure this correctly updates the preferences state
  };



  const addNotification = (message, type) => {
    // console.log('Before setNotifications, notifications:', notifications);
    // console.log('Notifications Array:', notifications);  // Log the notifications before adding
    setNotifications((prevNotifications) => {
      const updatedNotifications = [
        ...prevNotifications,
        { id: Date.now(), message, type }
      ];
      // console.log('Updated Notifications:', updatedNotifications);  // Log updated notifications
      return updatedNotifications;
    });
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };


  
 
  const connectEmailProvider = async () => {
    try {
      // Simulate API call to connect email provider
      setEmailProviderStatus("connecting");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      setEmailProviderStatus("connected");
    } catch (error) {
      console.error("Error connecting email provider:", error);
      setEmailProviderStatus("error");
    }
  };
  

  return (
    <NotificationContext.Provider
      value={{
        preferences,
        setPreferences,
        updatePreferences,
        notifications,
        addNotification,
        removeNotification,
        connectEmailProvider,
        emailProviderStatus,
        loading,
        setLoading, // Expose the function to change loading state
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
