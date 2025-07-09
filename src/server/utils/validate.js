// utils/validate.js

// Validate if the email is in correct format
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Validate password strength (at least 8 characters, including one number and one letter)
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };
  
  // Validate if the input is not empty

  const validateNotEmpty = (input) => {
    // Check if input is a string and not undefined or null
    if (typeof input !== 'string') {
      return false;  // Return false if input is not a string
    }
    return input.trim().length > 0;
  };
  
  export default { validateEmail, validatePassword, validateNotEmpty };
  