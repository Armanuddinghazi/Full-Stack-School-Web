const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: String,
  author: String,
  comments: { type: Number, default: 0 },
  date: String,
  description: String,
  image: String,
  slug: String
}, { timestamps: true });

module.exports = mongoose.model("Blog", BlogSchema);
