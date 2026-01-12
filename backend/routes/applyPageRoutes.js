const express = require("express");
const router = express.Router();
const multer = require("multer");
const ApplyPage = require("../models/ApplyPage");

const storage = multer.diskStorage({
  destination: "uploads/apply",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* GET */
router.get("/", async (req, res) => {
  const data = await ApplyPage.findOne();
  res.json(data);
});

/* CREATE / UPDATE */
router.post("/", upload.single("image"), async (req, res) => {
  const body = JSON.parse(req.body.data);

  if (req.file) {
    if (!body.howApply) body.howApply = {};
    body.howApply.image = `/uploads/apply/${req.file.filename}`;
    // body.image = `/uploads/apply/${req.file.filename}`;
  }

  const existing = await ApplyPage.findOne();

  if (existing) {
    await ApplyPage.updateOne({}, body);
    res.json({ message: "Updated Successfully" });
  } else {
    await ApplyPage.create(body);
    res.json({ message: "Created Successfully" });
  }
});

module.exports = router;
