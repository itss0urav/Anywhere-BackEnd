const mongoose = require("mongoose");

//User schema

const reportModel = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    postId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportModel);
