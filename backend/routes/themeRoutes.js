const express = require("express");
const router = express.Router();
const Theme = require("../models/Theme");

/* GET THEME */
router.get("/", async (req, res) => {
  const theme = await Theme.findOne();
  res.json(theme);
});

/* UPDATE THEME (ADMIN) */
router.post("/", async (req, res) => {
  const data = req.body;
  const theme = await Theme.findOneAndUpdate({}, data, {
    new: true,
    upsert: true
  });
  res.json({ success: true, theme });
});

module.exports = router;
