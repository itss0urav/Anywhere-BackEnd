const Post = require("../models/post");
const Vote = require("../models/vote");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

//@desc creating a new post
//@access Protected
//@route /post

const createPost = asyncHandler(async (req, res) => {
  console.log(req.user);

  const { title, description } = req.body;
  if (!title || !description)
    return res.status(404).send("Please give required fields");
  // const user = await User.findOne({_id:req.user._id})
  const response = await Post.create({
    ...req.body,
    userId: req.user._id,
    username: req.user.username,
  });
  if (!response) return res.status(500).send("Something went wrong");
  const vote = await Vote.create({ postId: response._id, vote: 0, userId: [] });
  await Post.findOneAndUpdate(
    { _id: response._id },
    {
      vote: vote._id,
    }
  );
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

  //When only description need to be updated
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

  return res.status(200).send(result);
});

//@desc getting all pots
//@Route /posts
//@acess Protected
//@method GET
const getPosts = asyncHandler(async (req, res) => {
  console.log();
  try {
    if (Object.keys(req.query).length === 0) {
      const posts = await Post.find({}).populate("vote").populate("userId");
      if (!posts) return res.status(500).send("Something wend wrong0");
      return res.status(200).send(posts);
    } else {
      const posts = await Post.find(req.query)
        .populate("vote")
        .populate("userId");
      if (!posts) return res.status(500).send("Something wend wrong0");
      return res.status(200).send(posts);
    }
  } catch (error) {
    console.log(error);
  }
});

//@desc delete post
//@method delete
//@route /post
//acess protected

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  if (!id) return res.status(401).send("Please give required details");

  const result = await Post.findOneAndDelete({ _id: id });

  if (!result) return res.status(500).send("Unable to delete post");

  return res.status(200).send("Sucessfully deleted the post");
});



module.exports = { createPost, updatePost, getPosts, deletePost };
