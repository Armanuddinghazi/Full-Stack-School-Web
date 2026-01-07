const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");


/* CONTACT FORM SUBMIT */
router.post("/submit", async (req, res) => {
    console.log('BODY', req.body);
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const msg = await ContactMessage.create({ name, email, subject, message });
    console.log('SAVED', msg);

    res.json({ message: "Message sent successfully" });
  } catch (err) {
    console.log('ERROR', err);
    res.status(500).json({ message: "Message save failed" });
  }
});



module.exports = router;
