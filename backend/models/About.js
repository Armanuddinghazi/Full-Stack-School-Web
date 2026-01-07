// models/About.js
const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  tagline: String,
  heading: String,
  description: String,
  quote: String,
  experienceText: String,
  images: {
    img1: String,
    img2: String,
    img3: String
  }
}, { timestamps: true });

module.exports = mongoose.model("About", aboutSchema);
