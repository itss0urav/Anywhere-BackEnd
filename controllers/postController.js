const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

//@desc creating a new post
//@acess Protected

const createPost = asyncHandler(async (req, res) => {
  const { userId, title, description } = req.body;
console.log(req.body)
  if(!userId || !title || !description) return res.status(404).send("Please give required fields")
  let postObj = {
    userId,
    title,
    description,
  };

  const response = await Post.create(postObj);
  if(!response) return res.status(500).send("Something went wrong")

  return res.status(200).json(response)
});


module.exports = {createPost}