const About = require("../models/About");

const getImage = (files, key, old) =>
  files?.[key] ? `/uploads/about/${files[key][0].filename}` : old;

// GET
exports.getAbout = async (req, res) => {
  const about = await About.findOne();
  res.json(about);
};

// ADD
exports.createAbout = async (req, res) => {
  const about = new About({
    ...req.body,
    images: {
      img1: `/uploads/about/${req.files.img1[0].filename}`,
      img2: `/uploads/about/${req.files.img2[0].filename}`,
      img3: `/uploads/about/${req.files.img3[0].filename}`,
    },
  });

  await about.save();
  res.json(about);
};

// UPDATE
exports.updateAbout = async (req, res) => {
  const old = await About.findById(req.params.id);

  const updated = await About.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      images: {
        img1: getImage(req.files, "img1", old.images.img1),
        img2: getImage(req.files, "img2", old.images.img2),
        img3: getImage(req.files, "img3", old.images.img3),
      },
    },
    { new: true }
  );

  res.json(updated);
};

// DELETE
exports.deleteAbout = async (req, res) => {
  await About.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
