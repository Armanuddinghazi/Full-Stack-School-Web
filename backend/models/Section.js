// models/Section.js
const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  sectionKey: {
    type: String,
    required: true,
    unique: true, 
  },
  tagline: String,
  heading: String,
  paragraph: String,
}, { timestamps: true });

module.exports = mongoose.model("Section", sectionSchema);
