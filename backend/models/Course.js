const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    tagline: String,
    heading: String,
    paragraph: String,
    title: String,
    tag: String,
    image: String,
    lessons: Number,
    rating: Number,
    seats: Number,
    duration: String,
    price: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
