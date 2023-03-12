const mongoose = require("mongoose");

//Post schema

const voteModel = new mongoose.Schema(
  {
    upVotedUserId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    vote: {
      type: Number,
    },
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    downVotedUserId:[{
      type: mongoose.Types.ObjectId,
      ref: "User"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", voteModel);
