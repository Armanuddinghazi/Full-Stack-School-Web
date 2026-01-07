const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const multer = require("multer");

// Image Upload
const storage = multer.diskStorage({
  destination: "uploads/blog",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

/* GET ALL BLOGS */
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

/* ADD BLOG */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      image: req.file ? `/uploads/blog/${req.file.filename}` : ""
    });
    res.json(blog);
  } catch {
    res.status(500).json({ message: "Add failed" });
  }
});

/* UPDATE BLOG */
router.put("/:id", upload.single("image"), async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image = `/uploads/blog/${req.file.filename}`;

  const updated = await Blog.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(updated);
});

/* DELETE BLOG */
router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

module.exports = router;
