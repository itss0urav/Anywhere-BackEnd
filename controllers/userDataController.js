const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const getUserData = asyncHandler(async (req, res) => {
  console.log(req.user);
  const posts = await Post.find({ userId: req.user._id });
  let voteCount = 0;
  const result = await Post.find({ userId: req.user._id }).populate("vote");
  result.forEach((post) => {
    voteCount = voteCount + post.vote.vote;
  });
  return res.status(200).send({
    voteCount,
    postCount: posts.length,
    userCreationTime: req.user.createdAt,
  });
});

module.exports = { getUserData };
