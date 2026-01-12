const mongoose = require("mongoose");

const infraSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String, 
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Infrastructure", infraSchema);
