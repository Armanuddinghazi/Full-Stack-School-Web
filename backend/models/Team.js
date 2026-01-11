const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },

    facebook: String,
    whatsapp: String,
    linkedin: String,
    youtube: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
