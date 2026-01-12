const mongoose = require("mongoose");

const listItemSchema = new mongoose.Schema({
  text: String
});

const sectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  description2: String,
  image: String,

  leftList: [listItemSchema],
  rightList: [listItemSchema],

  buttonText: String,
  buttonLink: String
});

const applyPageSchema = new mongoose.Schema({
  howApply: sectionSchema,
  thingsToKnow: sectionSchema,
  documentsAid: sectionSchema
}, { timestamps: true });

module.exports = mongoose.model("ApplyPage", applyPageSchema);
