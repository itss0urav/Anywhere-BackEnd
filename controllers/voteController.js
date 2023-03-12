const Vote = require("../models/vote");
const asyncHandler = require("express-async-handler");

//@desc Upvoting post
//@access Protected
//@route /post
const upVotePost = asyncHandler(async (req, res) => {
  const { postId, up } = req.body;
  let result;
  if (!postId || !up)
    return res.status(404).send("Please check the request body");
  const existingVote = await Vote.findOne({ postId });
  let existingVoteNumber = existingVote.vote;

  if (up) {
    let voteDuplication = existingVote.upVotedUserId.some(
      (user) => user.toHexString() == req.user._id
    );
    if (voteDuplication) {
      result = await Vote.findOneAndUpdate(
        { postId },
        {
          vote: existingVoteNumber - 1,
          $pop: { upVotedUserId: req.user._id },
        },
        {
          new: true,
        }
      );
    } else {
      result = await Vote.findOneAndUpdate(
        { postId },
        {
          vote: existingVoteNumber + 1,
          $push: { upVotedUserId: req.user._id },
        },
        {
          new: true,
        }
      );
     
    }
  } else {
    let voteDuplication = existingVote.downVotedUserId.some(
      (user) => user.toHexString() == req.user._id
    );
  
    if(voteDuplication){
      result = await Vote.findOneAndUpdate(
        { postId },
        {
          vote: existingVoteNumber + 1,
          $pop: { downVotedUserId: req.user._id },
        },
        {
          new: true,
        }
      )
    }else{
      result = await Vote.findOneAndUpdate(
        { postId },
        {
          vote: existingVoteNumber - 1,
          $push: { downVotedUserId: req.user._id },
        },
        {
          new: true,
        }
      )
    }
  }
})
 

module.exports = { upVotePost };
