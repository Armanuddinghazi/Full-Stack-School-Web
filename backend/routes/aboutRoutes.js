const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAbout,
  createAbout,
  updateAbout,
  deleteAbout,
} = require("../controllers/aboutController");

const storage = multer.diskStorage({
  destination: "uploads/about",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.get("/", getAbout);

router.post(
  "/",
  upload.fields([
    { name: "img1", maxCount: 1 },
    { name: "img2", maxCount: 1 },
    { name: "img3", maxCount: 1 },
  ]),
  createAbout
);

router.put(
  "/:id",
  upload.fields([
    { name: "img1", maxCount: 1 },
    { name: "img2", maxCount: 1 },
    { name: "img3", maxCount: 1 },
  ]),
  updateAbout
);

router.delete("/:id", deleteAbout);

module.exports = router;
