import mongoose from 'mongoose';

// ── Schema ─────────────────────────────────────────────────────
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ── Model & Export ─────────────────────────────────────────────
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;