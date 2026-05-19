import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { securityHeaders, apiLimiter } from './middlewares/security.middleware';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global Security Wrappers & Standard Middleware
app.use(securityHeaders);
app.use(apiLimiter);
app.use(cors());
app.use(express.json());

// Routes
import apiRoutes from './routes/api.routes';

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'InsightU API is running' });
});

// Bind unified router cleanly under the global path mount /api
app.use('/api', apiRoutes);

// Global Error Handler
app.use(errorHandler);

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/insightu';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
