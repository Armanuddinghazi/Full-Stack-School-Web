const express = require("express");
const router = express.Router();
const DisclosureTable = require("../models/DisclosureTable");

/* GET TABLE BY KEY */
router.get("/:key", async (req, res) => {
  try {
    const table = await DisclosureTable.findOne({
      tableKey: req.params.key,
    });
    res.json(table);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

/* GET ALL TABLES (FRONTEND) */
router.get("/", async (req, res) => {
  const tables = await DisclosureTable.find();
  res.json(tables);
});

/* CREATE / UPDATE TABLE */
router.post("/", async (req, res) => {
  const { tableKey, title, columns, rows } = req.body;

  let table = await DisclosureTable.findOne({ tableKey });

  if (table) {
    table.title = title;
    table.columns = columns;
    table.rows = rows;
    await table.save();
  } else {
    await DisclosureTable.create({
      tableKey,
      title,
      columns,
      rows,
    });
  }

  res.json({ message: "Table saved successfully" });
});

module.exports = router;
