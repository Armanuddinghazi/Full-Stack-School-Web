const express = require("express");
const router = express.Router();
const multer = require("multer");
const HeaderTop = require("../models/HeaderTop");

const storage = multer.diskStorage({
  destination: "uploads/logo",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* GET */
router.get("/", async (req, res) => {
  const data = await HeaderTop.findOne();
  res.json(data);
});

/* ADD */
router.post("/", 
   upload.fields([
    { name: "headerLogo", maxCount: 1 },
    { name: "footerLogo", maxCount: 1 }
  ]),
  async (req, res) => {
  const exists = await HeaderTop.findOne();
  if (exists) return res.status(400).json({ msg: "Already exists" });

const BASE_URL = import.meta.env.VITE_API_URL_IMG;

  const data = new HeaderTop({
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      footerContent: req.body.footerContent,

      headerLogo: req.files?.headerLogo
        ? `${BASE_URL}/uploads/logo/${req.files.headerLogo[0].filename}`
        : "",

      footerLogo: req.files?.footerLogo
        ? `${BASE_URL}/uploads/logo/${req.files.footerLogo[0].filename}`
        : "",

      socialLinks: JSON.parse(req.body.socialLinks)
    });
  await data.save();
  res.json(data);
});

/* UPDATE */
router.put("/:id", 
  upload.fields([
    { name: "headerLogo", maxCount: 1 },
    { name: "footerLogo", maxCount: 1 }
  ]), async (req, res) => {
     const BASE_URL = import.meta.env.VITE_API_URL_IMG;
     const updateData = {
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      footerContent: req.body.footerContent,
      socialLinks: JSON.parse(req.body.socialLinks),
    };

    if (req.files?.headerLogo) {
      updateData.headerLogo = `${BASE_URL}/uploads/logo/${req.files.headerLogo[0].filename}`;
    }

    if (req.files?.footerLogo) {
      updateData.footerLogo = `${BASE_URL}/uploads/logo/${req.files.footerLogo[0].filename}`;
    }

  const updated = await HeaderTop.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );
  res.json(updated);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await HeaderTop.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});


module.exports = router;
