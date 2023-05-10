const mongoose = require("mongoose");

//Report schema

const reportModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref:"User"
    },
    postId: {
      type: mongoose.Types.ObjectId,
      ref:"Post"
    },
    reason:{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportModel);
