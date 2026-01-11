const express = require("express");
const Counter = require("../models/Counter");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/counter",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });
// GET all counters
router.get("/", async (req, res) => {
  const counters = await Counter.find();
  res.json(counters);
});

// Add counter
router.post("/", upload.single("icon"), async (req, res) => {
  const counter = await Counter.create({
    title: req.body.title,
    value: req.body.value,
    icon: `/uploads/counter/${req.file.filename}`
  });
  res.json(counter);
});

// Update counter 

router.put("/:id", upload.single("icon"), async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.icon = `/uploads/counter/${req.file.filename}`;
  }
  const updated = await Counter.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(updated);
});

// DELETE counter
router.delete("/:id", async (req, res) => {
  await Counter.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
