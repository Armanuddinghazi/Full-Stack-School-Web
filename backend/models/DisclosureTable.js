const mongoose = require("mongoose");

const disclosureSchema = new mongoose.Schema({
  tableKey: {
    type: String,
    required: true,
    unique: true,
  },
  title: String,

  // Dynamic columns
  columns: [String],

  // Each row = array of cell values
  rows: [
    {
      cells: [String],
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("DisclosureTable", disclosureSchema);
