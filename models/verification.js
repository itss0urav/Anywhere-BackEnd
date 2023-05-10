const mongoose = require("mongoose");

//Verification schema

const verificationModel = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    fullName: {
      type: String,
    },
    website: {
      type: String,
    },
    company: {
      type: String,
    },
    governmentId: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Verification", verificationModel);
