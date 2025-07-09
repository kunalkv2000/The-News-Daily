import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-none shadow-md text-center">
        <h2 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h2>
        <p className="mt-4 text-gray-600">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 text-red-800 hover:text-red-900">Go back to Homepage</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
