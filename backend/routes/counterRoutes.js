const express = require("express");
const Counter = require("../models/Counter");
const router = express.Router();

// GET all counters
router.get("/", async (req, res) => {
  const counters = await Counter.find();
  res.json(counters);
});

// ADD counter
router.post("/", async (req, res) => {
  const counter = new Counter(req.body);
  await counter.save();
  res.json(counter);
});

// UPDATE counter
router.put("/:id", async (req, res) => {
  const counter = await Counter.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(counter);
});

// DELETE counter
router.delete("/:id", async (req, res) => {
  await Counter.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
