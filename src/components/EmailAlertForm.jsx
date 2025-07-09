import React, { useState, useEffect } from "react";
import { useNotificationContext } from "../context/NotificationContext";

const AlertSettingsForm = () => {
  const { preferences, updatePreferences } = useNotificationContext();
  const [formData, setFormData] = useState({
    categories: preferences?.categories || [],
    frequency: preferences?.frequency || "daily",
    notificationChannels: preferences?.notificationChannels || [],
  });

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (preferences) {
      setFormData({
        categories: preferences.categories || [],
        frequency: preferences.frequency || "daily",
        notificationChannels: preferences.notificationChannels || [],
      });
    }
  }, [preferences]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updatePreferences(formData);
      setErrorMessage(null); // Clear error if successful
      alert("Preferences updated!");
    } catch (error) {
      setErrorMessage("There was an error updating your preferences.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold">Select Categories</h3>
        <div className="flex flex-wrap gap-4">
          {["Sports", "Technology", "Business", "Entertainment"].map(
            (category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="categories"
                  value={category}
                  checked={formData.categories.includes(category)}
                  onChange={handleChange}
                />
                <span>{category}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Frequency */}
      <div>
        <h3 className="text-lg font-semibold">Notification Frequency</h3>
        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          className="p-2 border rounded-md"
        >
          <option value="immediate">Immediate</option>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      {/* Notification Channels */}
      <div>
        <h3 className="text-lg font-semibold">Select Notification Channels</h3>
        <div className="flex flex-wrap gap-4">
          {["email", "sms", "push"].map((channel) => (
            <label key={channel} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="notificationChannels"
                value={channel}
                checked={formData.notificationChannels.includes(channel)}
                onChange={handleChange}
              />
              <span>{channel}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500">{errorMessage}</div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Save Preferences
      </button>
    </form>
  );
};

export default AlertSettingsForm;

