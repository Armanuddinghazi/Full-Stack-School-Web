const express = require("express");
const router = express.Router();
const ScholarshipSection = require("../models/ScholarshipSection");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/scholarship",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  const data = await ScholarshipSection.findOne();
  res.json(data);
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const data = await ScholarshipSection.create({
      title: req.body.title,
      description: req.body.description,
      image: req.file ? `/uploads/scholarship/${req.file.filename}` : null,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* UPDATE */
router.put("/:id", upload.single("image"), async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.image = `/uploads/scholarship/${req.file.filename}`;
  }
  const updated = await ScholarshipSection.findByIdAndUpdate(
    req.params.id,
    data,
    { new: true }
  );
  res.json(updated);
});

module.exports = router;
