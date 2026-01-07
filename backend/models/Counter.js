const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: Number, required: true },
  icon: { type: String, required: true } 
});

module.exports = mongoose.model("Counter", counterSchema);
