const mongoose = require("mongoose");

const ScholarshipCardSchema = new mongoose.Schema({
  icon: String,
  cardTitle: String,
  cardContent: String,
}, { timestamps: true });

module.exports = mongoose.model("ScholarshipCard", ScholarshipCardSchema);
