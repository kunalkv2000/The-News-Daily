import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePages";
import UnsubscribePage from "./pages/UnsubscribePage";
import DashboardPage from "./pages/DashboardPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import SignupPage from "./pages/Auth/SignupPage";
import LoginPage from "./pages/Auth/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import NotificationPage from "./pages/NotificationPage";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import SettingsPage from "./pages/SettingsPage";

const RouterComponent = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      {/* Other public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
      {/* <Route path="/notifications" element={<NotificationPage />} /> */}
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/unsubscribe/:userId" element={<UnsubscribePage />} />
      <Route path="*" element={<NotFoundPage />} />{" "}
      {/* Fallback route for unmatched URLs */}
    </Routes>
  );
};

export default RouterComponent;
