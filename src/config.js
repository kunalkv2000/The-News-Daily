// config.js
import 'dotenv/config';  // To load environment variables from .env file
import mongoose from 'mongoose';


export const connectDB = async () => {
    try {
  
      if (!process.env.MONGO_URL) {
          console.error("MONGO_URL is not defined in .env");
          process.exit(1); // Exit if MONGO_URL is not defined
        }

  
      console.log("Connecting to MongoDB with URL:", process.env.MONGO_URL);
  
    await mongoose.connect(process.env.MONGO_URL);
  
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1);
    }
  };
const config = {
  // MongoDB URI
  mongoURI: process.env.MONGO_URL,

  // External service API keys
  
  emailServiceUser: process.env.EMAIL_USER, // If using email service credentials like Nodemailer
  emailServicePass: process.env.EMAIL_PASS, // If using email service credentials like Nodemailer

  // JWT Secret for signing tokens
  jwtSecret: process.env.JWT_SECRET,

  // Frontend URL (e.g., for email links)
  frontendURL: process.env.FRONTEND_URL,

  // Other configuration settings
  port: process.env.PORT || 5000, // Default to port 5000 if not set
};

export default config;
