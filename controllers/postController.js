const Post = require("../models/post");
const Vote = require("../models/vote");
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
  const vote = await Vote.create({postId:response._id,vote:0,userId:[]})
  return res.status(200).json(response);
});

//@desc Updating a post
//@access Protected
//@route /post
//@method PATCH

const updatePost = asyncHandler(async (req, res) => {
  const { title, description, postId } = req.body;
  let result;
  //Sanitizing
  if (!title && !description) {
    return res.status(401).send("Please send atleast one parameter");
  }

  //When both title and description need to be updated
  if (title && description) {
    result = await Post.findOneAndUpdate(
      { _id: postId },
      {
        title,
        description,
      },
      {
        new: true,
      }
    );
    if (!result) return res.status(500).send("Something went wrong");
  }

  //when only description need to be updated
  if (!title && description) {
    result = await Post.findOneAndUpdate(
      { _id: postId },
      {
        description,
      },
      {
        new: true,
      }
    );
    if (!result) return res.status(500).send("Something went wrong");
  }

  //when only title need to be updated
  if (title && !description) {
    result = await Post.findOneAndUpdate(
      { _id: postId },
      {
        title,
      },
      {
        new: true,
      }
    );
    if (!result) return res.status(500).send("Something went wrong");
  }

  return res.status(200).send(result)
});

module.exports = { createPost, updatePost };
