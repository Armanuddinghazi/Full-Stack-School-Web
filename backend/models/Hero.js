const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  image: {
    data: Buffer,
    contentType: String
  }
});

const HeroSchema = new mongoose.Schema({
  slides: [SlideSchema]
});

module.exports = mongoose.model("Hero", HeroSchema);
