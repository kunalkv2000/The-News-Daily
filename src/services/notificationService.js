import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a transporter using Gmail's SMTP service (you can also use other SMTP services)
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail service for sending emails
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email address from .env
    pass: process.env.EMAIL_PASS, // Your Gmail password or App-specific password
  },
});

// Function to send an email notification (general purpose)
 const sendEmailNotification = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email from .env
    to, // Recipient email
    subject, // Email subject
    text, // Plain text content
    html, // HTML content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};

// Function to send a password reset email
 const sendPasswordResetEmail = async (email, resetToken) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const subject = "Password Reset Request";
  const text = `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`;
  const html = `<p>You requested a password reset. Click the link below to reset your password:</p><a href="${resetLink}">Reset Password</a>`;

  await sendEmailNotification(email, subject, text, html);
};

 export { sendEmailNotification, sendPasswordResetEmail };
