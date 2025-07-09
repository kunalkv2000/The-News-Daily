import express from 'express';

import { sendNewsAlert } from '../utils/sendEmail.js';
import sendEmail from '../utils/sendEmail.js';

import { processNewsAlerts } from '../controllers/notificationController.js';
// import { sendNotification } from '../utils/sendEmail.js';
import { subscribeToCategories } from '../controllers/notificationController.js';

const router = express.Router();

// send-alert

router.post('/send-alert', async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const result = await sendEmail(email, subject, message);

  if (result.success) {
    return res.status(200).json({ success: true, message: 'Alert sent successfully' });
  } else {
    return res.status(500).json(result);
  }
});


router.post('/send-notification', async (req, res) => {
  const { message, user, newsUpdates } = req.body;

  console.log('Received notification request:', { message, user });

  if (!user || !message) {
      console.error('User or message missing in the request body');
    return res.status(400).json({ success: false, message: 'User and message are required' });
  }

  try {
      console.log('Received notification request:', { message, user }); // Log incoming data for debugging
      await sendNewsAlert(user, newsUpdates);
      console.log('Notification sent successfully');
      res.status(200).json({ success: true, message: 'Notification sent successfully' });
    } catch (error) {
      console.error('Error in sendNotification:', error); // Log the error
      res.status(500).json({ success: false, message: 'Error sending notification', error });
    }
});




// Test connection route
router.post('/test-connection', async (req, res) => {
    console.log('Received request for /test-connection'); // Check if this log appears when you make the request
  
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required for testing the connection.',
      });
    }
  
    try {
      await sendEmail(email, 'Test Email Connection', 'This is a test email to check your connection.');
      res.json({
        success: true,
        message: 'Connection successful! Test email sent.',
      });
    } catch (error) {
      console.error('Error testing email connection:', error);
      res.status(500).json({
        success: false,
        message: 'Unable to connect. Please check your email settings.',
      });
    }
  });



  // Define the route for handling POST requests
router.post('/news-alerts', processNewsAlerts);


router.post('/subscribe', subscribeToCategories);

  
  

  

export default router;
