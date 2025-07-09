import User from '../models/User.js';        // Assuming you have a User model
import Preference from '../models/Preference.js';  // Assuming you have a Preference model


// Create new user
const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Failed to create user.");
  }
};

// Get user by email
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    console.error("Error fetching user:", err);
    throw new Error("Failed to fetch user.");
  }
};

// Create or update preferences
const createOrUpdatePreferences = async (userId, preferences) => {
  try {
    const existingPreferences = await Preference.findOne({ user: userId });

    if (existingPreferences) {
      existingPreferences.preferences = preferences;
      await existingPreferences.save();
      return existingPreferences;
    } else {
      const newPreferences = new Preference({
        user: userId,
        preferences,
      });
      await newPreferences.save();
      return newPreferences;
    }
  } catch (err) {
    console.error("Error saving preferences:", err);
    throw new Error("Failed to save preferences.");
  }
};

module.exports = { createUser, getUserByEmail, createOrUpdatePreferences };
