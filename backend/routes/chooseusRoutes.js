const express = require("express");
const router = express.Router();
const multer = require("multer");
const Choose = require("../models/ChooseUs");

// Multer config
const storage = multer.diskStorage({
  destination: "uploads/choose",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* GET */
router.get("/", async (req, res) => {
  const data = await Choose.findOne();
  res.json(data);
});

/* CREATE / UPDATE */
router.post("/", upload.single("image"), async (req, res) => {
  const { tagline, heading, paragraph, cards } = req.body;

  const payload = {
    tagline,
    heading,
    paragraph,
    cards: JSON.parse(cards),
  };

  if (req.file) {
    payload.image = `/uploads/choose/${req.file.filename}`;
  }

  const existing = await Choose.findOne();

  let result;
  if (existing) {
    result = await Choose.findByIdAndUpdate(existing._id, payload, {
      new: true,
    });
  } else {
    result = await Choose.create(payload);
  }

  res.json(result);
});

module.exports = router;
