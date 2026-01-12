const express = require("express");
const router = express.Router();
const Career = require("../models/Career");
const upload = require("../utils/resumeUpload");

/* CREATE */
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Resume required (PDF/DOC)" });
    }

    const data = await Career.create({
      fullName: req.body.fullName,
      email: req.body.email,
      mobile: req.body.mobile,
      salary: req.body.salary,
      teachingExp: req.body.teachingExp,
      adminExp: req.body.adminExp,
      vision: req.body.vision,
      resident: req.body.resident,
      post: req.body.post,
      resume: `/uploads/resumes/${req.file.filename}`,
    });

    res.json(data);
  } catch (err) {
    console.error("CAREER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});



/* LIST (ADMIN / PAGE) */
router.get("/", async (req, res) => {
  const data = await Career.find().sort({ createdAt: -1 });
  res.json(data);
});

module.exports = router;
