const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  count: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  icon: {
    type: String, 
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Feature", featureSchema);
