import express from 'express';
import authController from '../controllers/authController.js';
const { login, signup, updateUserDetails,requestPasswordReset, verifyToken, resetPassword } = authController;
import authenticateUser from '../middlewears/authMiddlewear.js';

// import { login, signup } from '../controllers/authController.js'; // Adjust path if needed
const router = express.Router();

router.post('/login', (req, res, next) => {
  console.log('Login route hit');
  // console.log('Request body:', req.body);
  next(); // Pass to controller
}, login);

router.post('/signup', signup);

// Update user details
router.put('/update', authenticateUser, updateUserDetails);

router.post('/verify-token', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});

router.post('/request-reset', requestPasswordReset);


router.post('/reset-password/:token', resetPassword);


export default router;

