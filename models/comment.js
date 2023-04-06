const mongoose = require("mongoose");

//Comment schema
const commetModel = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  replies:[{
    userId:{type:mongoose.Types.ObjectId,ref:"User"},
    content:String,
  }]
});

module.exports = mongoose.model("Comment", commetModel);
