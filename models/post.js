const mongoose = require("mongoose");

//Post schema
const postModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    vote: {
      type: mongoose.Types.ObjectId,
      ref: "Vote",
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    comments: [
      {
        type: [mongoose.Types.ObjectId],
        ref: "Comment",
        required: false,
      },
    ],
    username: {
      type: String,
    },
    isNfsw: {
      type: Boolean,
      required: false,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postModel);
