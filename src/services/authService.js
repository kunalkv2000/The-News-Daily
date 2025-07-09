import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';  // Ensure the correct path and file extension
import dotenv from 'dotenv';


dotenv.config();

const generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register new user
const registerUser = async (userData) => {
  const { name, email, password } = userData;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = generateAuthToken(newUser._id);
    return { user: newUser, token };
  } catch (err) {
    console.error("Error registering user:", err);
    throw new Error("Failed to register user.");
  }
};

// Login user
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateAuthToken(user._id);
    return { user, token };
  } catch (err) {
    console.error("Error logging in user:", err);
    throw new Error("Failed to login user.");
  }
};

export default { registerUser, loginUser };
