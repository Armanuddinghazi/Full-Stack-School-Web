const router = require("express").Router();
const Infra = require("../models/Infrastructure");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/infra",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

/* GET (Frontend) */
router.get("/", async (req, res) => {
  const infras = await Infra.find().sort({ createdAt: -1 });
  res.json(infras);
});

/* ADD (Admin) */
router.post("/", upload.single("image"), async (req, res) => {
  const infra = await Infra.create({
    title: req.body.title,
    content: req.body.content,
    image: `/uploads/infra/${req.file.filename}`
  });
  res.json(infra);
});

/* UPDATE */
router.put("/:id", upload.single("image"), async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.image = `/uploads/infra/${req.file.filename}`;
  }
  const updated = await Feature.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(updated);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Infra.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
