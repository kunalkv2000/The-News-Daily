import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useGlobalStateContext } from "../../context/GlobalStateContext";
import axios from "axios";

const ResetPasswordPage = () => {
  const { token } = useParams(); // Get the reset token from the URL
  const navigate = useNavigate();
  const { confirmPassword, setConfirmPassword, newPassword, setNewPassword, success, setSuccess, error, setError } = useAuthContext();

const { loading, setLoading } = useGlobalStateContext();
  
  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send the token and new password to the backend
    //   const response = await axios.post('http://localhost:5000/api/auth/reset-password/:token', { token, newPassword });
    // const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { newPassword });

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password/${token}`, 
      { newPassword }
    );
    
      // Handle successful password reset
      alert('Password reset successful!');
      addNotification("Password Reset done!", "success");
      navigate('/login');  // Redirect to login page after reset
    } catch (err) {
      // Handle error (e.g., invalid/expired token)
      setError(err.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-none shadow-md">
        <h2 className="text-2xl font-normal text-center mb-6">Reset Your Password</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-normal text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full p-3 mt-1 border rounded-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 bg-red-800 text-white font-none rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/login')}  // Navigate back to login page
            className="text-sm text-red-800"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;