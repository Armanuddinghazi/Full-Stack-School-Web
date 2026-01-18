const express = require('express');
const router = express.Router();
const multer = require('multer');
const Footer = require('../models/Footer');

const storage = multer.diskStorage({
  destination: "uploads/footerlogo",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// GET Footer Data
router.get('/', async (req, res) => {
    try {
        // Humesha first document return karenge
        const footerData = await Footer.findOne();
        res.json(footerData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE Footer Data (Admin ke liye)
router.put('/', upload.single('logo'), async (req, res) => {
    try {
        const parsedData = JSON.parse(req.body.data); 
        
        if (req.file) {
            parsedData.logo = `/uploads/footerlogo/${req.file.filename}`;
        }
        const updatedFooter = await Footer.findOneAndUpdate({}, parsedData, {
            new: true,
            upsert: true 
        });
        res.json(updatedFooter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;