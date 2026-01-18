const express = require('express');
const router = express.Router();
const multer = require('multer');
const Header = require('../models/Header');

const storage = multer.diskStorage({
  destination: "uploads/logo",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// GET Header Data
router.get('/', async (req, res) => {
    try {
        const data = await Header.findOne();
        res.json(data || {});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/', upload.single('logo'), async (req, res) => {
    try {
        const parsedData = JSON.parse(req.body.data); 
        
        if (req.file) {
            parsedData.logo = `/uploads/logo/${req.file.filename}`;
        }

        const updatedHeader = await Header.findOneAndUpdate({}, parsedData, {
            new: true,
            upsert: true
        });
        res.json(updatedHeader);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;