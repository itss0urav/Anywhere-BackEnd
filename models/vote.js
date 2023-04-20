const mongoose = require("mongoose");

//Post schema

const voteModel = new mongoose.Schema(
  {
    upVotedUserId: [
      {
        type: String
      },
    ],
    vote: {
      type: Number,
    },
    resourceId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    downVotedUserId:[{
      type: String
      
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", voteModel);
