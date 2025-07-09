import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalStateContext } from "../context/GlobalStateContext";
import SettingsPage from "../pages/SettingsPage";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import notifications from "./NotificationToast";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { handlelogin, handlelogout, user, setUser } = useAuthContext();
  const { preferences } = useGlobalStateContext();
  const { categories } = preferences;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // console.log('AuthContext:', { user, handlelogin, handlelogout });

  // const logout = () => {
  //   setUser(null);
  //   localStorage.removeItem("authToken");
  // };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white text-black shadow-lg relative z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className="flex items-center text-xl font-extrabold text-black">
          <Link to="/" className="text-black text-3xl font-normal">
            <img
              class="w-auto h-12"
              src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/logo-header.png"
              alt=""
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-black focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`md:flex space-x-6 ${
            isMobileMenuOpen
              ? "flex flex-col absolute top-full right-0 bg-white w-full p-4"
              : "hidden"
          }`}
        >
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-black font-normal hover:text-red-500 transition duration-300 py-2 px-4 block md:inline-block"
          >
            Home
          </Link>

          {!isLoading ? (
            user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className="text-black font-normal hover:text-red-500 transition duration-300 py-2 block md:inline-block"
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  onClick={closeMobileMenu}
                  className="text-black font-normal hover:text-red-500 transition duration-300 py-2 block md:inline-block"
                >
                  Settings
                </Link>

                <div className="relative">
                  <Link
                    to="/notifications"
                    onClick={closeMobileMenu}
                    className="text-black block md:inline-block"
                  >
                    <Tooltip title="Notifications">
                      {" "}
                      {/* Optional: Add hover text */}
                      <IconButton
                        aria-label="notifications" // Accessibility
                        sx={{
                          color: "gray", // Initial color
                          "&:hover": {
                            color: "black", // Hover color
                            transform: "scale(1.1)", // Increase size on hover
                          },
                        }}
                      >
                        <NotificationsIcon />
                      </IconButton>
                    </Tooltip>
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-black rounded-full text-xs px-2">
                        {notifications.length}
                      </span>
                    )}
                  </Link>
                </div>

                <button
                  onClick={() => {
                    handlelogout();
                    closeMobileMenu();
                  }}
                  className="text-white rounded-lg border hover:bg-red-700 transition duration-300 bg-red-500 px-4 py-2 font-normal focus:outline-none focus:ring-2  block md:inline-block"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center justify-center space-x-4 mr-0">
                <Link to="/login" onClick={closeMobileMenu}>
                  <button className="text-white border hover:bg-red-700 transition duration-300 bg-black px-4 py-2 font-normal rounded-lg focus:outline-none focus:ring-2md:inline-block">
                    Login
                  </button>
                </Link>
                <Link to="/signup" onClick={closeMobileMenu}>
                  <button className="text-white border  hover:bg-red-700 transition duration-300 bg-red-500 px-4 py-2 font-normal rounded-lg focus:outline-none focus:ring-2  block md:inline-block">
                    Sign Up
                  </button>
                </Link>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-48">
              {" "}
              {/* Adjust h-48 as needed */}
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            // <p>Loading...</p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
