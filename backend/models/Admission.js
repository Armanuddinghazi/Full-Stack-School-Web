const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema(
  {
    student: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      dob: { type: Date, required: true },
      previousClass: { type: String },
      applyingClass: { type: String, required: true },
      previousSchool: { type: String },
      gender: { type: String, required: true },
      bloodGroup: { type: String },
      source: { type: String },
      ageOnApril: { type: Number },
      studiedBefore: { type: String }
    },

    parents: {
      fatherName: { type: String, required: true },
      motherName: { type: String, required: true },
      fatherPhone: { type: String, required: true },
      fatherEmail: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email"]
      },
      fatherOccupation: { type: String },
      motherOccupation: { type: String },
      motherPhone: { type: String }
    },

    siblings: [
      {
        name: String,
        class: String
      }
    ],

    guardian: {
      name: String,
      relation: String
    },

    address: {
      permanent: { type: String, required: true },
      parentAddress: { type: String }
    },

    agree: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admission", AdmissionSchema);
