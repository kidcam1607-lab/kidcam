import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import albumRoutes from './routes/albums.js';
import galleryRoutes from './routes/gallery.js';
import sharingRoutes from './routes/sharing.js';

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin/albums', albumRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/sharing', sharingRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port', process.env.PORT || 5000);
});
