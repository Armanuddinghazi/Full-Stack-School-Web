const router = require("express").Router();
const Hero = require("../models/Hero");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer();

/**
 * GET ALL SLIDES
 */
router.get("/", async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) return res.json([]);

    const slides = hero.slides.map((slide) => ({
      _id: slide._id,
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      image: slide.image
        ? `data:${slide.image.contentType};base64,${slide.image.data.toString(
            "base64"
          )}`
        : "",
    }));

    res.json(slides);
  } catch (err) {
    res.status(500).json([]);
  }
});

/**
 * ADD NEW SLIDE
 */
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    let hero = await Hero.findOne();

    if (!hero) {
      hero = new Hero({ slides: [] });
    }
    hero.slides.push({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      image: req.file
        ? { data: req.file.buffer, contentType: req.file.mimetype }
        : null,
    });

    await hero.save();
    res.json({ message: "Slide Added" });
  } catch (err) {
    res.status(500).json({ message: "Add failed" });
  }
});

/**
 * UPDATE SLIDE
 */
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) return res.status(404).json({ message: "Hero not found" });

    const slide = hero.slides.id(req.params.id);
    if (!slide) return res.status(404).json({ message: "Slide not found" });

    slide.title = req.body.title;
    slide.subtitle = req.body.subtitle;
    slide.description = req.body.description;

    if (req.file) {
      slide.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await hero.save();
    res.json({ message: "Slide updated" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

/**
 * DELETE SLIDE
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    const slideIndex = hero.slides.findIndex(
      (s) => s._id.toString() === req.params.id
    );

    if (slideIndex === -1) {
      return res.status(404).json({ message: "Slide not found" });
    }

    hero.slides.splice(slideIndex, 1);
    await hero.save();

    res.json({ message: "Slide deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
