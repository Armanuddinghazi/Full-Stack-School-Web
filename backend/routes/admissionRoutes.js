const express = require("express");
const router = express.Router();
const Admission = require("../models/Admission");

// POST FORM
router.post("/", async (req, res) => {
  try {
    if (!req.body.agree) {
      return res.status(400).json({ message: "Please accept terms & conditions" });
    }
    const admission = new Admission(req.body);
    await admission.save();

    res.status(201).json({
      success: true,
      message: "Admission form submitted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
