import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';
import { sendPasswordResetEmail } from '../utils/sendEmail.js';
import bcrypt from 'bcryptjs';


import validate from '../utils/validate.js'

const { validateEmail, validatePassword, validateNotEmpty } = validate;

const generateResetToken = (email) => {
  // Generate a JWT token using the user's email
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '10m' });
};



const login = async (req, res) => {
  console.log('Inside login controller');
  const { email, password } = req.body;
  // console.log('Email:', email);
  // console.log('Password:', password);

  if (!validateEmail(email)) {
    console.log('Invalid email format');
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!validateNotEmpty(password)) {
    console.log('Password is required');
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    // Use .select('+password') to include password in the query
    const user = await User.findOne({ email }).select('+password');
    // console.log('User:', user);

    if (!user) {
      console.log('Invalid email');
      return res.status(400).json({ message: 'User not found' });
    }
    if (!password) {
      console.log('Invalid email or password');
      return res.status(400).json({ message: 'Invalid password' });
    }
    // console.log('Password received:', password);



     // Log the stored hash and entered password in hex format
     const storedHashBuffer = Buffer.from(user.password, 'utf8');
    //  console.log('Stored Hash Buffer:', storedHashBuffer.toString('hex'));
    //  console.log('Entered Password Buffer:', Buffer.from(password, 'utf8').toString('hex'));

    const isMatch = await user.matchPassword(password);
    // console.log('Password match:', isMatch);


    if (!isMatch) {
      console.log('Invalid email or password');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    // console.log('Generated token:', token);

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate email and password format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters, including one number and one letter' });
  }

  // Ensure name is not empty
  if (!validateNotEmpty(name)) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// update user details

 const updateUserDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming JWT middleware attaches user info to `req.user`
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      return res.status(400).json({ message: "Please provide at least one field to update." });
    }

    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;

    if (password) {
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    // Find the user and update their details
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true, // Ensure validation rules from the schema are applied
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }


    // Send email notification
    const emailContent = `
      Hello ${updatedUser.name || "User"},<br><br>
      Your account details have been successfully updated.<br>
      
      Regards,<br>News app
    `;

    try {
      await sendEmail(
        updatedUser.email,
        'Account Details Updated',
        emailContent
      );
      console.log('Email notification sent successfully.');
    } catch (emailError) {
      console.error('Error sending email notification:', emailError.message);
    }

    res.status(200).json({
      message: "User details updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "An error occurred while updating user details" });
  }
};

// request password reset
const requestPasswordReset = async (req, res) => {
  // console.log('Request body:', req.body); // Log incoming request body
  const { email } = req.body;

  // Validate the email format
  if (!validateEmail(email)) {
    console.log('Invalid email format');
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Generate the reset token
    const resetToken = generateResetToken(email);
    // console.log(resetToken);

    // Create the reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;



  // Send the reset link via email (using the same link)
  await sendPasswordResetEmail(email, resetLink);

    res.status(200).json({
      message: 'Password reset email sent successfully',
      resetToken: resetToken,
    });

  } catch (error) {
    console.error('Error in requestPasswordReset:', error);
    res.status(500).json({ message: 'Failed to send reset email' });
  }
};




// verify token

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Store the user id in the request for further processing
    next(); // Proceed to the next middleware/controller
  } catch (err) {
    console.error('Token verification failed', err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Password Reset Controller


const resetPassword = async (req, res) => {
  try {
    // const { token, newPassword } = req.body;

    const { token } = req.params;  // Extract token from URL params
    const { newPassword } = req.body;

    // Validate required fields
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;

    // console.log('Decoded Token:', decoded);

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

     // Log the password before hashing
    //  console.log('New password before hashing:', newPassword);

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // console.log('Hashed password:', hashedPassword);

    // Update the user's password
    user.password = hashedPassword;
    // console.log('User before saving:', user);
   try {
  const updatedUser = await user.save();
  // console.log('User saved successfully:', updatedUser);
} catch (error) {
  // console.error('Error saving user:', error);
}

    res.status(200).json({ message: 'Password reset successful. You can now log in.' });
  } catch (error) {
    console.error('Error resetting password:', error.message);
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};




export default { login, signup, updateUserDetails, resetPassword, verifyToken, requestPasswordReset };
