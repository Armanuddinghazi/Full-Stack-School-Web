const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  tag: String,
  image: String,
  lessons: Number,
  rating: Number,
  seats: Number,
  duration: String,
  price: String,
  description: String,
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
