import jwt from 'jsonwebtoken';
import User from '../models/User.js';


// Middleware to authenticate user
 const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret key
    const user = await User.findById(decoded.id).select('id name email'); // Fetch user from the database

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; // Attach full user info to the request


    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default authenticateUser;
