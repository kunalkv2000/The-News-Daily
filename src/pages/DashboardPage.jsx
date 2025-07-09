import React, { useEffect, useState } from "react";
import { useNotificationContext } from "../context/NotificationContext.jsx";
import AlertSettingsForm from "../components/AlertSettingsForm.jsx";

const DashboardPage = () => {
  const {
    preferences,
    updatePreferences,
    notifications,
    addNotification,
    loading,
    setLoading,
    emailProviderStatus,
    connectEmailProvider,
  } = useNotificationContext();

  const [submitStatus, setSubmitStatus] = useState(null); // To track form submission status

  const [email, setEmail] = useState("");

  useEffect(() => {
    // Perform any async initialization or loading when the component mounts
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Alert Settings Form */}
      <div class="bg-white border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl">
        <h2 class="text-2xl font-medium mb-4 text-center">
          Manage Notification Preferences
        </h2>
        <div className="bg-white p-6 rounded-none">
          <AlertSettingsForm
          // preferences={preferences}
          // onSubmit={handlePreferencesSubmit}
          />
          {submitStatus && (
            <div
              className={`mt-4 p-4 rounded-none ${
                submitStatus.success ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {submitStatus.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
