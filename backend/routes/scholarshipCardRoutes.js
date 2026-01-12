const express = require("express");
const router = express.Router();
const multer = require("multer");
const ScholarshipCard = require("../models/ScholarshipCard");

const storage = multer.diskStorage({
  destination: "uploads/scholarship",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  const cards = await ScholarshipCard.find();
  res.json(cards);
});

router.post("/", upload.single("icon"), async (req, res) => {
  const card = await ScholarshipCard.create({
    cardTitle: req.body.cardTitle,
    cardContent: req.body.cardContent,
    icon: `/uploads/scholarship/${req.file.filename}`
  });
  res.json(card);
});

router.put("/:id", upload.single("icon"), async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.icon = `/uploads/scholarship/${req.file.filename}`;
  }
  const updated = await ScholarshipCard.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(updated);
});


router.delete("/:id", async (req, res) => {
  await ScholarshipCard.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
