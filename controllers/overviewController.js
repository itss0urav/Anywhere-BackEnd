const asyncHandler = require("express-async-handler");
const Vote = require("../models/vote");
const Comment = require("../models/comment");


//Get Most viewed commment from the comment based on vote
const getTopComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId }).populate("userId");
  if (comments) {
    let topCommentVote = 0, topComment;
    for (let comment of comments) {
        const commentVote = await Vote.find({resourceId:comment._id.toString()})
        if(commentVote[0]?.vote > topCommentVote){
            topCommentVote = commentVote[0]?.vote
            topComment = comment
        }
    }
    const result = topComment || "Not top comments"
    return res.status(200).send(result)
  }
});

module.exports = getTopComments;
