import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNotificationContext } from './NotificationContext';
import { useGlobalStateContext } from './GlobalStateContext';
const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const { addNotification, setNotifications } = useNotificationContext();
    const { loading, setLoading } = useGlobalStateContext();


  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false); // For toggling forgot password form
  const [resetEmail, setResetEmail] = useState("");
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const [success, setSuccess] = useState(false);

    
  
     // Fetch user data if authToken is available
     useEffect(() => {
      const fetchUser = async () => {
        if (token) {
          try {
            const response = await axios.get('/api/user', {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
          } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
            localStorage.removeItem('authToken');
          }
        }
      };
  
      fetchUser();
    }, [token]);
  
    
  


  const handlelogin = (userData, token) => {
    setUser(userData);
    setToken(token);
    // setNotifications([]);
    
    localStorage.setItem('authToken', token);
  };

  const handlelogout = () => {
    setUser(null);
    setToken(null);
    setNotifications([]);
    localStorage.removeItem('authToken');
  };

 // Function to handle the signup process
 const handleSignup = async (userData, token) => {
    try {
      // Set the user and token in state
      setUser(userData);
      setToken(token);

      // Store token in localStorage for persistence
      localStorage.setItem("authToken", token);

    } catch (err) {
      console.error("Signup Error:", err);
    }
  };

 


  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Ensure this works by passing the event object
    setLoading(true);
    setError(""); // Reset error state
  
    try {
      // const response = await fetch("http://localhost:5000/api/auth/request-reset", {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/request-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }
  
      // Show success notification
      addNotification("Password reset email sent successfully", "success");
      setSuccessMessage("Password reset email has been sent. Please check your inbox.");
      // Optionally reset the form
      setResetEmail("");
      setForgotPassword(false); // Navigate back to login form
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      addNotification(`Forgot Password Error: ${err.message}`, "error");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <AuthContext.Provider value={{ 
    user, 
    token, 
    setUser, 
    handlelogin, 
    handlelogout,
    email,
    setEmail,
    name,
    setName,
    error,
    setError,
    password,
    setPassword, 
    handleSignup,
    forgotPassword,
    resetEmail,
    setForgotPassword,
    setResetEmail,
    handleForgotPassword,
    newPassword, setNewPassword,
    success, setSuccess,
    confirmPassword, setConfirmPassword,
     }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
