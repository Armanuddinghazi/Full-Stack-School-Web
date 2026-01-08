const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");

/* GET all active notices */
router.get("/", async (req, res) => {
  const notices = await Notice.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(notices);
});

/* ADD notice (Admin) */
router.post("/", async (req, res) => {
  const notice = new Notice({ text: req.body.text });
  await notice.save();
  res.json({ message: "Notice added", notice });
});

/* UPDATE notice */
router.put("/:id", async (req, res) => {
  await Notice.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Notice updated" });
});

/* DELETE notice */
router.delete("/:id", async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ message: "Notice deleted" });
});

module.exports = router;
