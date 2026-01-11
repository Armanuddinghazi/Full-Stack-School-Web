const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/authMiddleware");
const ContactMessage = require("../models/ContactMessage");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/contact",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* GET CONTACT DATA */
router.get("/", async (req, res) => {
  const contact = await Contact.findOne();
  res.json(contact);
});

/* CREATE / UPDATE CONTACT WITH IMAGE */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let contact = await Contact.findOne();
    const payload = {
      ...req.body,
    };
    if (req.file) {
      payload.image = `/uploads/contact/${req.file.filename}`;
    }
    if (contact) {
      await Contact.findByIdAndUpdate(contact._id, payload);
    } else {
      await Contact.create(payload);
    }
    res.json({ message: "Contact updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Contact update failed" });
  }
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
