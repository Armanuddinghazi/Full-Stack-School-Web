const mongoose = require("mongoose");

const ScholarshipSectionSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: String,
  description: String,
}, { timestamps: true });

module.exports = mongoose.model("ScholarshipSection", ScholarshipSectionSchema);
