const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

//@desc Upvoting post
//@access Protected
//@route /post
const createComment = asyncHandler(async (req, res) => {
  const { postId, content } = req.body;
  if (!postId && !content)
    return res.status(404).send("Please check the request body");
  req.body.userId = req.user._id;
  const comment = await Comment.create(req.body);
  if (!comment) return res.status(500).send("Something went wrong");
  return res.status(200).send(comment);
});

const getComments = asyncHandler(async (req, res) => {

const { postId } = req.query;
  if (!postId) return res.status(404).send("Please check the request body");

  const response = await Comment.find({postId}).populate("userId")
  if(!response) return res.status(500).send("Something went wrong")

  return res.status(200).send(response)

})

module.exports = { createComment, getComments };
