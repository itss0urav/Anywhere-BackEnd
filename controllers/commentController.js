const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

//@desc Upvoting post
//@access Protected
//@route /post
const createComment = asyncHandler(async (req, res) => {

  if (!postId && !userId && !content)
    return res.status(404).send("Please check the request body");

  const comment = await Comment.create(req.body)
if(!comment) return res.status(500).send("Something went wrong")
  return res.status(200).send(comment);
});

module.exports = { createComment };
