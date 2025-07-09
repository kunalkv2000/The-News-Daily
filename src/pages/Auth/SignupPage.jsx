import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirection after successful signup


import { useNotificationContext } from "../../context/NotificationContext";
import { useGlobalStateContext } from "../../context/GlobalStateContext";
import { useAuthContext } from "../../context/AuthContext";

const SignupPage = () => {
  const { addNotification } = useNotificationContext();
  
  const { setUser } = useGlobalStateContext();// For storing user globally on successful signup

  const { loading, setLoading } = useNotificationContext();

  const { login, setName, setEmail, setPassword, setError, name, email, password, error, handleSignup } = useAuthContext();
  // const navigate = useNavigate();

  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // const response = await fetch("http://localhost:5000/api/auth/signup", {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

       // Use login from context to set user and token globally
       handleSignup(data.user, data.token);

     


      // Clear form states after successful signup
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      addNotification("Signup successful", "success");
      navigate("/login"); // Redirect to home or dashboard page
    } catch (err) {
      setError(err.message);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-none shadow-md">
        <h2 className="text-2xl font-normal text-center mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-3 mt-1 border rounded-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-normal text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-1 border rounded-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-normal text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-1 border rounded-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 bg-red-800 text-white font-normal rounded-none ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
