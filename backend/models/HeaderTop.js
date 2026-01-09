const mongoose = require("mongoose");

const HeaderTopSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  headerLogo: { type: String},
  footerLogo: { type: String},
  footerContent: { type: String},

  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    whatsapp: String
  }
}, { timestamps: true });

module.exports = mongoose.model("HeaderTop", HeaderTopSchema);
