import React, { useState, useEffect } from "react";
import { useNotificationContext } from "../context/NotificationContext";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const AlertSettingsForm = () => {
  const { preferences, updatePreferences, addNotification, setPreferences } =
    useNotificationContext();
  const { user, setUser } = useAuthContext();

  const [formData, setFormData] = useState({
    categories: preferences?.categories || [],
    frequency: preferences?.frequency || "",
    notificationChannels: preferences?.notificationChannels || [],
  });

  const [email, setEmail] = useState(preferences?.email || ""); // Initialize email state

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      if (name === "notificationChannels") {
        // Handle notificationChannels as an object
        return {
          ...prevData,
          notificationChannels: {
            ...prevData.notificationChannels,
            [value]: checked, // Update the specific notification channel
          },
        };
      } else if (type === "checkbox") {
        // Handle arrays like categories
        return {
          ...prevData,
          [name]: checked
            ? [...prevData[name], value] // Add the item if checked
            : prevData[name].filter((item) => item !== value), // Remove the item if unchecked
        };
      } else {
        // Handle other types of inputs
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form Submitted:', formData);

    const updatedFields = [];

    if (formData.frequency !== preferences.frequency) {
      updatedFields.push(`Frequency changed to ${formData.frequency}`);
    }

    if (
      JSON.stringify(formData.categories) !==
      JSON.stringify(preferences.categories)
    ) {
      updatedFields.push(`Categories updated to ${formData.categories}`);
    }

    if (updatedFields.length > 0) {
      const message = updatedFields.join(", ");
      // console.log('Calling addNotification with message:', message);
      addNotification(message, "success");

      if (!formData.notificationChannels.email) {
        return alert(
          "Please check the email checkbox to receive notifications."
        );
      }

      // Trigger a backend notification
      try {
        console.log("Sending notification with payload:", {
          message,
          user: {
            // email: email,  // Use the email provided in the email section
            notificationChannels: formData.notificationChannels,
            categories: formData.categories,
          },
        });

        // const response = await axios.put(`http://localhost:5000/api/preferences/${user.id}`,

        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/preferences/${user.id}`,

          {
            notificationChannels: formData.notificationChannels,
            categories: formData.categories,
            frequency: formData.frequency,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Attach token in the header
            },
          }
        );

        if (response.data.message === "Preferences updated successfully.") {
          setSuccessMessage("Preferences updated successfully!");
          setPreferences(response.data.preference); // Update state with new preferences
        } else {
          console.error("Error in response:", response.data);
        }

        // }
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    } else {
      console.log("No changes detected, notification not called");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-4">
        <label for="gender" className="block text-gray-700 font-medium mb-2">
          Notification Frequency
        </label>
        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-gray-400"
          required
        >
          <option value="immediate">Immediate</option>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Select Categories
        </label>

        {["Sports", "Technology", "Business", "Entertainment"].map(
          (category) => (
            <label
              key={category}
              className="block text-gray-700 font-medium mb-2"
            >
              <input
                type="checkbox"
                name="categories"
                value={category}
                checked={formData.categories.includes(category)}
                onChange={handleChange}
                className="mr-2"
              />
              <span>{category}</span>
            </label>
          )
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Enable Email Notifications
        </label>
        <label className="block text-gray-700 font-medium mb-2">
          <input
            type="checkbox"
            name="notificationChannels"
            checked={formData.notificationChannels.email} // Check state for "email"
            onChange={handleChange} // Update state on toggle
            className="mr-2"
          />
          <span>Email</span>
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Save Preferences
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <p
          style={{
            color: "green",
            background: "#d4f4dd",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          {successMessage}
        </p>
      )}
    </form>
  );
};

export default AlertSettingsForm;
