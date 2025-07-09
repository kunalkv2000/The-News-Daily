import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

// Function to generate reset token (JWT)
export const generateResetToken = (email) => {
  // Create a JWT reset token with the user's email and a 1-hour expiration time
  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '1h', // 1 hour expiration
  });

  return resetToken;
};


// Function to verify reset token
const verifyResetToken = (token) => {
  try {
    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // If valid, return the decoded data (email)
  } catch (error) {
    throw new Error('Invalid or expired reset token');
  }
};

export default verifyResetToken;
