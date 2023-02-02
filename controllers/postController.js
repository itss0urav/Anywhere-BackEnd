const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

//@desc creating a new post
//@access Protected
//@route /post

const createPost = asyncHandler(async (req, res) => {
  const { userId, title, description } = req.body;
  console.log(req.body);
  if (!userId || !title || !description)
    return res.status(404).send("Please give required fields");
  let postObj = {
    userId,
    title,
    description,
  };

  const response = await Post.create(postObj);
  if (!response) return res.status(500).send("Something went wrong");

  return res.status(200).json(response);
});

//@desc Upvoting post
//@access Protected
//@route /post
const upVotePost = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findOne({ _id: postId });
  let upVotes = post.upVotes;
  const response = await Post.findOneAndUpdate(
    { _id: postId },
    {
      upVotes: upVotes + 1,
    },
    { new: true }
  );

  if (!response) return res.status(404).send("Something wend wrong");

  return res.status(200).json(response);
});

module.exports = { createPost, upVotePost };
