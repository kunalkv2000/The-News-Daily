
import notificationRoutes from './src/server/routes/notificationRoutes.js';
import preferenceRoutes from './src/server/routes/preferenceRoutes.js';
import newsRoutes from './src/server/routes/newsRoute.js';
import authRoute from './src/server/routes/authRoute.js';
import express from 'express';
import authenticateUser from './src/server/middlewears/authMiddlewear.js';
// import { fetchNewsByCategories } from './src/server/controllers/preferenceController.js';

import cors from 'cors';
// import dotenv, { config } from 'dotenv';
import dotenv from 'dotenv';
dotenv.config();





import { connectDB } from './src/config.js';




dotenv.config(); // Load environment variables from .env file

const app = express();

connectDB(); 

// const corsOptions = {
//   origin: 'https://676fcaf7c3164c5f26a04c51--nimble-puppy-db4fdc.netlify.app' || process.env.FRONTEND_URL,// Set your local dev URL or frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
//   credentials: true, // Allow credentials if needed
// };

const corsOptions = {
  origin: [
    'https://nimble-puppy-db4fdc.netlify.app', // Deployed frontend
    'http://localhost:5173' // Local frontend for development
    
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // Allow credentials if needed
};

// const corsOptions = {
//   origin: [
//     'http://localhost:5173', // Local frontend for development
//     'https://676fcaf7c3164c5f26a04c51--nimble-puppy-db4fdc.netlify.app' // Deployed frontend
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
//   credentials: true, // Allow credentials if needed
// };




  app.use(cors(corsOptions));


  app.options('*', cors(corsOptions)); // Preflight requests handler


// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware for CORS (Cross-Origin Resource Sharing) support


// Default route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the news app!');
  console.log('Root route working');
});

// Define authentication routes (can be extended for other routes)
app.get('/api/user', authenticateUser, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, name: req.user.name });
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/auth',authRoute);
app.use('/api/preferences', preferenceRoutes);



app.use('/api', newsRoutes);


app.use('/api/notifications', notificationRoutes);





// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
