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

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/services', serviceRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Lexvra API is running' });
});

const connectDB = async () => {
  const uri = 'mongodb+srv://ashir16592:90600Asir@cluster0.1pa3y.mongodb.net/?appName=Cluster0';
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
