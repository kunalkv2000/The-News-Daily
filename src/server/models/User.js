import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; // For generating password reset tokens

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Do not return the password in queries by default
    },
    preferences: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Preference', // Reference to the Preference model
    },
    resetPasswordToken: String, // For password reset functionality
    resetPasswordExpire: Date,  // Expiry time for reset token
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt timestamps
  }
);



userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.password.startsWith('$2a$')) return next(); // Skip hashing if already hashed
  this.password = await bcrypt.hash(this.password, 10); // Hash password with a salt of 10 rounds
  next();
});


// Method to compare password during login// Method to compare password during login

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!enteredPassword) {
    throw new Error("Password is required");
  }

  try {
    // console.log("Entered password:", enteredPassword);
    // console.log("Stored hash:", this.password); // Log the stored hash
    return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with the hashed password
  } catch (error) {
    console.error('Error while comparing passwords:', error);
    throw new Error('Error while comparing passwords');
  }
};



// Add generateAuthToken method to the user schema
userSchema.methods.generateAuthToken = function () {
  // Generate a JWT token using the user's _id and a secret key
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust expiry as needed
  return token;
};


const User = mongoose.model('User', userSchema);

export default User;



