const express = require("express");
const router = express.Router();
const multer = require("multer");
const DisclosureTable = require("../models/DisclosureTable");

const storage = multer.diskStorage({
  destination: "uploads/disclosure",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* 1. GET FULL DATA  */
router.get("/", async (req, res) => {
  try {
    const tables = await DisclosureTable.find().sort({ createdAt: 1 });
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tables" });
  }
});

/* 2. GET LIST ONLY  */
router.get("/list", async (req, res) => {
  try {
    const tables = await DisclosureTable.find({}, { tableKey: 1, title: 1, label: 1 }).sort({ createdAt: 1 });
    
    const formattedTables = tables.map(t => ({
        key: t.tableKey,
        label: t.label || t.title || t.tableKey, 
        title: t.title
    }));
    
    res.json(formattedTables);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch list" });
  }
});

/* GET SINGLE TABLE */
router.get("/:key", async (req, res) => {
  try {
    const table = await DisclosureTable.findOne({ tableKey: req.params.key });
    res.json(table);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});
 

/* CREATE / UPDATE */
router.post("/", upload.any(), async (req, res) => {
  try {
    const body = JSON.parse(req.body.data);

    if (req.files?.length && body.rows?.length) {
      req.files.forEach((file) => {
        let indexData;
        try {
          indexData = JSON.parse(file.fieldname);
        } catch {
          return;
        }
        const { rowIndex, colIndex } = indexData;

        if (body.rows[rowIndex]?.cells?.[colIndex]) {
          body.rows[rowIndex].cells[colIndex].file = `/uploads/disclosure/${file.filename}`;
          body.rows[rowIndex].cells[colIndex].fileType = file.mimetype.includes("pdf") ? "pdf" : "image";
        }
      });
    }

    const existing = await DisclosureTable.findOne({ tableKey: body.tableKey });

    if (existing) {
      await DisclosureTable.updateOne({ tableKey: body.tableKey }, body);
    } else {
      await DisclosureTable.create(body);
    }

    res.json({ message: "Disclosure table saved" });
  } catch (err) {
    console.error("Disclosure Save Error:", err);
    res.status(500).json({ error: "Save failed" });
  }
});

/* --- NEW DELETE ROUTE ADDED HERE --- */
router.delete("/:key", async (req, res) => {
    try {
        const deletedTable = await DisclosureTable.findOneAndDelete({ tableKey: req.params.key });
        
        if (!deletedTable) {
            return res.status(404).json({ error: "Table not found" });
        }

        
        res.json({ message: "Table deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).json({ error: "Delete failed" });
    }
});

module.exports = router;