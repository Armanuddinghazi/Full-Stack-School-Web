const router = require("express").Router();
const Department = require("../models/Department");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/department",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

/* GET (Frontend) */
router.get("/", async (req, res) => {
  const departments = await Department.find().sort({ count: 1 }).limit(4);
  res.json(departments);
});

/* ADD (Admin) */
router.post("/", upload.single("icon"), async (req, res) => {
  const department = await Department.create({
    title: req.body.title,
    content: req.body.content,
    icon: `/uploads/department/${req.file.filename}`
  });
  res.json(department);
});

/* UPDATE */
router.put("/:id", upload.single("icon"), async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.icon = `/uploads/department/${req.file.filename}`;
  }
  const updated = await Department.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(updated);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Department.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
