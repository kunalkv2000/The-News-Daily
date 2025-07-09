import mongoose from 'mongoose';

// Define the schema for user preferences
const PreferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    theme: {
      type: String,
      enum: ['light', 'dark'], // Example values
      default: 'light',
    },
   
    notificationChannels: {
      email: {
        type: Boolean,
        default: true, // Email notifications are enabled by default
      },
    },
    categories: {
      type: [String], // Array of preferred categories
      default: ['general'], // Default preference is "general"
    },
    frequency: {
      type: String,
      enum: ['daily', 'hourly', 'immediate'], // Frequency options
      default: 'daily', // Default frequency is "daily"
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create the model from the schema
const Preference = mongoose.model('Preference', PreferenceSchema);

export default Preference;
