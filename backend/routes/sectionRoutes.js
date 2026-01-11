// routes/sectionRoutes.js
const express = require("express");
const router = express.Router();
const Section = require("../models/Section");

// GET section by key
router.get("/:key", async (req, res) => {
  const section = await Section.findOne({ sectionKey: req.params.key });
  res.json(section);
});

// CREATE / UPDATE (UPSERT)
router.post("/", async (req, res) => {
  const { sectionKey, tagline, heading, paragraph } = req.body;

  const section = await Section.findOneAndUpdate(
    { sectionKey },
    { tagline, heading, paragraph },
    { new: true, upsert: true }
  );

  res.json(section);
});

module.exports = router;
