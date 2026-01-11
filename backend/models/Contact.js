const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  address: String,
  phone: String,
  email: String,
  openTime: String,
  heading: String,
  description: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model("Contact", ContactSchema);
