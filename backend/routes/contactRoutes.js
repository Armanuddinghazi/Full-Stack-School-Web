const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/authMiddleware");
const ContactMessage = require("../models/ContactMessage");


/* GET CONTACT DATA */
router.get("/", async (req, res) => {
  const contact = await Contact.findOne();
  res.json(contact);
});

router.post("/", async (req, res) => {
  let contact = await Contact.findOne();

  if (contact) {
    await Contact.findByIdAndUpdate(contact._id, req.body);
  } else {
    await Contact.create(req.body);
  }

  res.json({ message: "Contact updated" });
});

router.delete("/", auth, async (req, res) => {
  await Contact.deleteMany({});
  res.json({ message: "Contact deleted" });
});


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
