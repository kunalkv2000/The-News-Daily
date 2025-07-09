import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router
import { useNotificationContext } from "../../context/NotificationContext";
import { useGlobalStateContext } from "../../context/GlobalStateContext";// Assuming you will create AuthContext for user authentication
import { useAuthContext } from "../../context/AuthContext";


const LoginPage = () => {
  const { addNotification } = useNotificationContext();
  // const { setUser } = useGlobalStateContext();// To store user info globally once logged in
  const { setUser } = useAuthContext();
  const { login, forgotPassword, setForgotPassword, resetEmail, setResetEmail, handleForgotPassword  } = useAuthContext();
  const navigate = useNavigate();

  // console.log("Auth Context Data:", {forgotPassword, setForgotPassword, resetEmail, setResetEmail, handleForgotPassword});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // const response = await fetch("http://localhost:5000/api/auth/login", 
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      if (!data || !data.token) {
        throw new Error("Invalid response from the server");
      }
  

      // Set user data to global context (AuthContext)
      setUser(data.user);

      // Store token in localStorage or sessionStorage
      localStorage.setItem("authToken", data.token);
      setSuccessMessage("Password reset email has been sent. Please check your inbox.");
      // addNotification("Login successful", "success");
      navigate("/");
    } catch (err) {
      setError(err.message);
      // addNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-none shadow-md">
        <h2 className="text-2xl font-normal text-center mb-6">
        {forgotPassword ? "Forgot Password" : "Login"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        {/* Login Form */}
        {!forgotPassword ? (
          <form onSubmit={handleSubmit}>
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
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                
                className="text-sm text-red-800"
              >
                Forgot password?
              </button>

              <div>
                <span className="text-sm text-gray-500">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => navigate("/signup")} // Navigate to Signup page
                  className="text-sm text-red-800"
                >
                  Sign up
                </button>
              </div>

            </div>
          </form>
        ) : (
          // Forgot Password Form
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label htmlFor="resetEmail" className="block text-sm font-normal text-gray-700">Enter your email</label>
              <input
                type="email"
                id="resetEmail"
                className="w-full p-3 mt-1 border rounded-none"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 bg-red-800 text-white font-normal rounded-none ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Sending email..." : "Send Reset Link"}
            </button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setForgotPassword(false)}
                className="text-sm text-red-800"
              >
                Back to login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

