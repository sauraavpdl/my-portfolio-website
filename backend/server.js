import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import contactRouter from './routes/contact.js';

// ── Load environment variables ─────────────────────────────────
dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ─────────────────────────────────────────────────
app.use(cors());                  // allow all origins
app.use(express.json());          // parse incoming JSON

// ── Routes ────────────────────────────────────────────────────
app.use('/api', contactRouter);

// ── MongoDB connection ─────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ── Start server ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});