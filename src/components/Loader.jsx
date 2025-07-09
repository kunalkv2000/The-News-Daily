import React from "react";
import { useNotificationContext } from "../context/NotificationContext";

const Loader = () => {
  const { loading } = useNotificationContext(); // Get loading state from context

  if (!loading) return null; // If not loading, don't display anything

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex items-center justify-center space-x-3">
        {/* Spinner (you can use any spinner or skeleton loader you prefer) */}
        <div className="w-12 h-12 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="text-white text-xl">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
