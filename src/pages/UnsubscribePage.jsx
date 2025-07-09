


import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UnsubscribePage = () => {
  const { userId } = useParams(); // Fetch `userId` from the URL params
  const [searchParams] = useSearchParams(); // To extract the token from the URL query
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
   
    const token = searchParams.get("token"); // Extract the token from the query params

  // Check if both userId and token are present
  if (!token || !userId) {
    setMessage("Invalid unsubscribe link.");
    setLoading(false);
    return;
  }

    const unsubscribeUser = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:5000/api/preferences/unsubscribe/${userId}?token=${token}`
        // );

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/preferences/unsubscribe/${userId}?token=${token}`
        );

        // Show success message
        setMessage(response.data.message || "You have been unsubscribed successfully.");
      } catch (error) {
        console.error("Error during unsubscription:", error.message);
        const errorMessage = error.response?.data?.error || "Failed to unsubscribe.";
        setMessage(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (token && userId) {
      unsubscribeUser();
    } else {
      setMessage("Invalid unsubscribe link.");
      setLoading(false);
    }
  }, [userId, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full bg-white shadow-md rounded-none p-6">
        <h2 className="text-xl font-normal text-center mb-4">Unsubscribe</h2>
        {loading ? (
          <p className="text-center text-gray-600">Processing your request...</p>
        ) : (
          <p className={`text-center ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
        {!loading && (
          <div className="text-center mt-4">
            <button
              className="bg-red-800 text-white py-2 px-4 rounded-none"
              onClick={() => navigate("/")} // Redirect to homepage or another page
            >
              Go Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnsubscribePage;
