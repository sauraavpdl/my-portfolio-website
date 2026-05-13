// routes/contact.js
import express from "express";
import Contact from "../db.js"; // assuming Contact model is exported from ../db.js

const router = express.Router();

// POST /contact → create a new contact message
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  try {
    const newContact = await Contact.create({ name, email, message });
    res.status(201).json({ success: true, data: newContact });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: "Failed to save contact message." });
  }
});

export default router;
