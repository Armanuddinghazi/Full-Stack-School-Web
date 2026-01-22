const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: "uploads/testimonials",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// GET All
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE
router.post('/', upload.single('image'), async (req, res) => {
    const { name, role, quote, rating } = req.body;
    const image = req.file ? `/uploads/testimonials/${req.file.filename}` : '';

    try {
        const newTestimonial = new Testimonial({ name, role, quote, rating, image });
        await newTestimonial.save();
        res.status(201).json(newTestimonial);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  const updateData = { ...req.body };

  if (req.file) {
    updateData.image = `/uploads/testimonials/${req.file.filename}`;
  }

  const updated = await Testimonial.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;