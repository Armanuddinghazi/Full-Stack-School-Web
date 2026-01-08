const router = require("express").Router();
const Feature = require("../models/Feature");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/features",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

/* GET (Frontend) */
router.get("/", async (req, res) => {
  const features = await Feature.find().sort({ count: 1 }).limit(4);
  res.json(features);
});

/* ADD (Admin) */
router.post("/", upload.single("icon"), async (req, res) => {
  const feature = await Feature.create({
    count: req.body.count,
    title: req.body.title,
    content: req.body.content,
    icon: `/uploads/features/${req.file.filename}`
  });
  res.json(feature);
});

/* UPDATE */
router.put("/:id", upload.single("icon"), async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.icon = `/uploads/features/${req.file.filename}`;
  }
  const updated = await Feature.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(updated);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Feature.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
