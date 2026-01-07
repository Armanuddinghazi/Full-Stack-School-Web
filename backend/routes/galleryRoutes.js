const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const multer = require("multer");

// IMAGE UPLOAD
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

/* GET ALL GALLERY */
router.get("/", async (req, res) => {
  const gallery = await Gallery.find().sort({ createdAt: -1 });
  res.json(gallery);
});

/* ADD */
router.post("/", upload.single("image"), async (req, res) => {
  const gallery = await Gallery.create({
    title: req.body.title,
    image: `/uploads/${req.file.filename}`
  });
  res.json(gallery);
});

/* UPDATE */
router.put("/:id", upload.single("image"), async (req, res) => {
  const data = { title: req.body.title };

  if (req.file) {
    data.image = `/uploads/${req.file.filename}`;
  }

  const updated = await Gallery.findByIdAndUpdate(
    req.params.id,
    data,
    { new: true }
  );

  res.json(updated);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
