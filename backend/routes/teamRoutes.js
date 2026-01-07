const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const multer = require("multer");

// IMAGE UPLOAD
const storage = multer.diskStorage({
  destination: "uploads/team",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

/* GET ALL TEAM */
router.get("/", async (req, res) => {
  const team = await Team.find().sort({ createdAt: -1 });
  res.json(team);
});

/* ADD TEAM */
router.post("/", upload.single("image"), async (req, res) => {
  const data = {
    ...req.body,
    image: `/uploads/team/${req.file.filename}`,
  };
  const team = await Team.create(data);
  res.json(team);
});

/* UPDATE TEAM */
router.put("/:id", upload.single("image"), async (req, res) => {
  const updateData = { ...req.body };

  if (req.file) {
    updateData.image = `/uploads/team/${req.file.filename}`;
  }

  const updated = await Team.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json(updated);
});

/* DELETE TEAM */
router.delete("/:id", async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.json({ message: "Team deleted" });
});

module.exports = router;
