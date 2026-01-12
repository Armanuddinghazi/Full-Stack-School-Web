// const express = require("express");
// const router = express.Router();
// const DisclosureTable = require("../models/DisclosureTable");

// /* GET TABLE BY KEY */
// router.get("/:key", async (req, res) => {
//   try {
//     const table = await DisclosureTable.findOne({
//       tableKey: req.params.key,
//     });
//     res.json(table);
//   } catch (err) {
//     res.status(500).json({ message: "Fetch failed" });
//   }
// });

// /* GET ALL TABLES (FRONTEND) */
// router.get("/", async (req, res) => {
//   const tables = await DisclosureTable.find();
//   res.json(tables);
// });

// /* CREATE / UPDATE TABLE */
// router.post("/", async (req, res) => {
//   const { tableKey, title, columns, rows } = req.body;

//   let table = await DisclosureTable.findOne({ tableKey });

//   if (table) {
//     table.title = title;
//     table.columns = columns;
//     table.rows = rows;
//     await table.save();
//   } else {
//     await DisclosureTable.create({
//       tableKey,
//       title,
//       columns,
//       rows,
//     });
//   }

//   res.json({ message: "Table saved successfully" });
// });

// module.exports = router;


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

/* GET */
router.get("/:key", async (req, res) => {
  try {
    const table = await DisclosureTable.findOne({ tableKey: req.params.key });
    res.json(table);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

/* GET ALL TABLES (FOR FRONTEND) */
router.get("/", async (req, res) => {
  try {
    const tables = await DisclosureTable.find().sort({ createdAt: 1 });
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tables" });
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

        if (
          body.rows[rowIndex] &&
          body.rows[rowIndex].cells &&
          body.rows[rowIndex].cells[colIndex]
        ) {
          body.rows[rowIndex].cells[colIndex].file =
            `/uploads/disclosure/${file.filename}`;

          body.rows[rowIndex].cells[colIndex].fileType =
            file.mimetype.includes("pdf") ? "pdf" : "image";
        }
      });
    }

    const existing = await DisclosureTable.findOne({
      tableKey: body.tableKey
    });

    if (existing) {
      await DisclosureTable.updateOne(
        { tableKey: body.tableKey },
        body
      );
    } else {
      await DisclosureTable.create(body);
    }

    res.json({ message: "Disclosure table saved" });
  } catch (err) {
    console.error("Disclosure Save Error:", err);
    res.status(500).json({ error: "Save failed" });
  }
});

module.exports = router;
