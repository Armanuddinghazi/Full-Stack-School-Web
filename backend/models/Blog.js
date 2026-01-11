const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    comments: { type: Number, default: 0 },
    date: String,
    content: String,
    image: String,
    slug: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
