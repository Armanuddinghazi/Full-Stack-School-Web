const mongoose = require("mongoose");

const chooseSchema = new mongoose.Schema(
  {
    tagline: String,
    heading: String,
    paragraph: String,
    image: String, // uploaded image path

    cards: [
      {
        title: String,
        text: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Choose", chooseSchema);
