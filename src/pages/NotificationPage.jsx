import React from "react"; // Corrected 'react' import to have a capital R
import NotificationToast from "../components/NotificationToast";
import Loader from "../components/Loader";

import { useNotificationContext } from "../context/NotificationContext";

const NotificationPage = () => {
  const { notifications, loading } = useNotificationContext();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-normal mb-4 px-8">Notification History</h2>
      <div className="bg-white p-6 shadow-lg rounded-none">
        {loading ? (
          <Loader /> // Show loader while loading
        ) : notifications.length === 0 ? (
          <p className="text-gray-600">
            No notifications yet. Start by enabling notifications.
          </p>
        ) : (
          <NotificationToast notifications={notifications} />
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
