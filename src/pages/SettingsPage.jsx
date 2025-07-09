import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../context/NotificationContext";


const SettingsPage = () => {

  const { addNotification } = useNotificationContext();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();

  // Fetch user details on page load
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
        // const response = await axios.get("http://localhost:5000/api/user", {

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Redirect to login if unauthorized
        if (error.response.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchUserDetails();
  }, [navigate]);

  // Handle update submission
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const updates = {};

      if (updatedName) updates.name = updatedName;
      if (updatedPassword) updates.password = updatedPassword;

      // const response = await axios.put("http://localhost:5000/api/auth/update", updates, {

      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/auth/update`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.message === "User details updated successfully") {
      // alert(response.data.message); // Notify user of success
      setSuccessMessage('Preferences updated successfully!');
      setUserDetails({
        ...userDetails,
        name: response.data.user.name,
      });
      setIsEditing(false);

     
      addNotification("Account details updated", "success");
    } else {
      console.error('Error in response:', response.data);
    }
    
    } catch (error) {
      console.error("Error updating user details:", error);
      // alert("Failed to update user details.");
    }
  };

  return (



    <div className="settings-page container mx-auto mt-10 px-4 max-w-2xl mb-10">
  <h1 className="text-3xl font-normal text-center mb-8 text-gray-800">Account Settings</h1>
  <div className="settings-container bg-white shadow-lg rounded-none p-6 space-y-6">

    {/* Email */}
    <div>
      <label className="block text-gray-700 text-lg font-normal mb-2">
        Email:
      </label>
      <p className="text-gray-600">{userDetails.email}</p>
    </div>

    {/* Name */}
    <div>
      <label className="block text-gray-700 text-lg font-normal mb-2">
        Name:
      </label>
      {isEditing ? (
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          placeholder={userDetails.name}
          className="w-full p-3 border border-gray-300 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800"
        />
      ) : (
        <p className="text-gray-600">{userDetails.name}</p>
      )}
    </div>

    {/* Password */}
    <div>
      <label className="block text-gray-700 text-lg font-normal mb-2">
        Password:
      </label>
      {isEditing ? (
        <input
          type="password"
          value={updatedPassword}
          onChange={(e) => setUpdatedPassword(e.target.value)}
          placeholder="New Password"
          className="w-full p-3 border border-gray-300 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800"
        />
      ) : (
        <p className="text-gray-600">********</p>
      )}
    </div>

    {/* Buttons */}
    <div className="flex justify-end space-x-4">
      {isEditing ? (
        <>
          <button
            onClick={handleUpdate}
            className="px-5 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition duration-300"
          >
            Save Changes
          </button>
          <button
            onClick={() => {
              setIsEditing(false); // Reset the editing state
              setUpdatedName(""); // Clear any changes made during editing
              setUpdatedPassword(""); // Clear password changes
            }}
            className="px-5 py-2 bg-gray-500 text-white rounded-none hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="px-5 py-2 bg-red-800 text-white rounded-none hover:bg-gray-600 transition duration-300"
        >
          Edit
        </button>
      )}
    </div>
    {successMessage && (
      <div className="mt-4 text-green-600 font-normal text-center">
        {successMessage}
      </div>
    )}
  </div>
  
</div>



  );
};

export default SettingsPage;





