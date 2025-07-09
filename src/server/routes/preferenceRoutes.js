import express from 'express';
import { updatePreference, getNewsAlerts, unsubscribe } from '../controllers/preferenceController.js';
import authenticateUser from '../middlewears/authMiddlewear.js';


const router = express.Router();

router.put('/:userId', authenticateUser, updatePreference); // Update preferences
router.get('/alerts/:userId', getNewsAlerts); // Get news alerts based on preferences
// Unsubscribe route
router.get('/unsubscribe/:userId', unsubscribe);




export default router;
