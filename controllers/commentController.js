const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const Vote = require("../models/vote");

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
  const vote = await Vote.create({resourceId: comment._id, vote: 0})
  await Comment.findByIdAndUpdate(comment._id,{
    vote: vote._id
  })
  return res.status(200).send(comment);
});

const getComments = asyncHandler(async (req, res) => {

const { postId } = req.query;
  if (!postId) return res.status(404).send("Please check the request body");

  const response = await Comment.find({postId}).populate("userId").populate("vote")
  if(!response) return res.status(500).send("Something went wrong")

  return res.status(200).send(response)

})


const deleteComment = asyncHandler(async (req, res) => {
  const {id} = req.params
  await Comment.findByIdAndDelete(id)
  return res.status(200).send("Comment successfully deleted")
})
module.exports = { createComment, getComments, deleteComment };
