const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  salary: { type: String, required: true },
  teachingExp: { type: String, required: true },
  adminExp: { type: String, required: true },
  vision: { type: String, required: true },
  resident: { type: String, required: true },
  post: { type: String, required: true },
  resume: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Career", careerSchema);
