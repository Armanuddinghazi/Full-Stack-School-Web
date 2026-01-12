// const mongoose = require("mongoose");

// const disclosureSchema = new mongoose.Schema({
//   tableKey: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   title: String,
//   columns: [String],
//   rows: [
//     {
//       cells: [String],
//     },
//   ],
// }, { timestamps: true });

// module.exports = mongoose.model("DisclosureTable", disclosureSchema);


const mongoose = require("mongoose");

const cellSchema = new mongoose.Schema({
  text: String,
  file: String,
  fileType: String
}, { _id: false });

const disclosureSchema = new mongoose.Schema({
  tableKey: { type: String, required: true, unique: true },
  title: String,
  columns: [String],
  rows: [
    {
      cells: [cellSchema]
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("DisclosureTable", disclosureSchema);
