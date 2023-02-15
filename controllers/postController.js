const Post = require("../models/post");
const Vote = require("../models/vote");
const asyncHandler = require("express-async-handler");

//@desc creating a new post
//@access Protected
//@route /post

const createPost = asyncHandler(async (req, res) => {

  console.log(req.body);
  if (!userId || !title || !description)
    return res.status(404).send("Please give required fields");

  const response = await Post.create({...req.body,userId:req.user._id});
  if (!response) return res.status(500).send("Something went wrong");
  await Vote.create({ postId: response._id, vote: 0, userId: [] });
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

  try{
      const posts = await Post.find({}).populate("vote")
      if(!posts) return res.status(500).send("Something wend wrong0")
  
      return res.status(200).send(posts)
  }
  catch(error){
      console.log(error)
  }
  
  })
  

module.exports = { createPost, updatePost, getPosts };
