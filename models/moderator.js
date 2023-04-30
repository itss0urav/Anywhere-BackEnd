const mongoose = require("mongoose");

//User schema

const moderatorModel = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Moderator", moderatorModel);
