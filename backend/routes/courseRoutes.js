const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const multer = require("multer");

// IMAGE UPLOAD
const storage = multer.diskStorage({
  destination: "uploads/course",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

/* ================= ADD COURSE ================= */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
      image: req.file ? `/uploads/course/${req.file.filename}` : ""
    });
    await course.save();
    res.json({ message: "Course added" });
  } catch (err) {
    res.status(500).json({ message: "Add failed" });
  }
});

/* ================= UPDATE COURSE ================= */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/course/${req.file.filename}`;
    }

    await Course.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: "Course updated" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

/* ================= DELETE COURSE ================= */
router.delete("/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
});

/* ================= GET COURSES ================= */
router.get("/", async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json(courses);
});

module.exports = router;
