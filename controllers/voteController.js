const Vote = require("../models/vote");
const asyncHandler = require("express-async-handler");

//@desc Upvoting post
//@access Protected
//@route /post
const upVotePost = asyncHandler(async (req, res) => {
  const { postId, up } = req.body;
  let result;
  if (!postId)
    return res.status(404).send("Please check the request body");

  const existingVote = await Vote.findOne({ postId });

let voteDuplication =  existingVote.userId.some(user => user.toHexString() == req.user._id)

if(voteDuplication){
  return res.status(201).send("User already voted to this post");
}
  //If no vote exists for given postId
  let existingVoteNumber = existingVote.vote;
  //If vpote exists for given postId
  result = await Vote.findOneAndUpdate(
    { postId },
    {
      vote: up ? existingVoteNumber + 1 : existingVoteNumber - 1,
      $push: { userId: req.user._id },
    },
    {
      new: true,
    }
  );

  return res.status(200).send(result);
});

module.exports = { upVotePost };
