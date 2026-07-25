import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import contactRoutes from './routes/contact.js';
import galleryRoutes from './routes/gallery.js';
import careerRoutes from './routes/careers.js';
import serviceRoutes from './routes/services.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3001';

app.use(cors({
  origin: ['https://lexvra-project-git-deploy-branch-md-asir-khans-projects.vercel.app'
, 'http://localhost:3001', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/services', serviceRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Lexvra API is running' });
});

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lexvra';
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log('MongoDB connected');
  } catch (err) {
    console.warn('MongoDB connection failed — running without database:', err.message);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
