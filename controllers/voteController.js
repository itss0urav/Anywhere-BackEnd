const Vote = require("../models/vote");
const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const { Types } = require("mongoose");
//@desc Upvoting post
//@access Protected
//@route /post
const upVotePost = asyncHandler(async (req, res) => {
  const { resourceId, up } = req.body;
  let result;
  if (!resourceId) return res.status(404).send("Please check the request body");
  const existingVote = await Vote.findOne({ resourceId });
  let existingVoteNumber = existingVote.vote;
  let upVotedUserId = existingVote.upVotedUserId;
  let downVotedUserId = existingVote.downVotedUserId;

  if (up) {
    let voteDuplication = existingVote.upVotedUserId.some(
      (user) => user == req.user._id.toString()
    );
    if (voteDuplication) {
      result = await Vote.findOneAndUpdate(
        { resourceId },
        {
          vote: existingVoteNumber - 1,
          upVotedUserId: upVotedUserId.filter(
            (id) => id !== req.user._id.toString()
          ),
          downVotedUserId: downVotedUserId.filter(
            (id) => id !== req.user._id.toString()
          ),
        },
        {
          new: true,
        }
      );
    } else {
      const isDownVotted = downVotedUserId.some((userId) => userId === req.user._id.toString())
      let newVote = isDownVotted ? existingVoteNumber + 2 : existingVoteNumber + 1
      result = await Vote.findOneAndUpdate(
        { resourceId },
        {
          vote: newVote,
          upVotedUserId: [...upVotedUserId, req.user._id.toString()],
          downVotedUserId: downVotedUserId.filter(
            (id) => id !== req.user._id.toString()
          ),
        },
        {
          new: true,
        }
      );
    }
  } else {
    let voteDuplication = existingVote.downVotedUserId.some(
      (user) => user == req.user._id.toString()
    );

    if (voteDuplication) {
      result = await Vote.findOneAndUpdate(
        { resourceId },
        {
          vote: existingVoteNumber + 1,
          downVotedUserId: downVotedUserId.filter(
            (id) => id !== req.user._id.toString()
          ),
          upVotedUserId:upVotedUserId.filter((userId) => userId !== req.user._id.toString())
        },
        {
          new: true,
        }
      );
    } else {
      const isUpVotted = upVotedUserId.some((userId) => userId === req.user._id.toString())
      let newVote = isUpVotted ? existingVoteNumber - 2 : existingVoteNumber - 1
      result = await Vote.findOneAndUpdate(
        { resourceId },
        {
          vote: newVote,
          downVotedUserId: [...downVotedUserId, req.user._id.toString()],
          upVotedUserId: upVotedUserId.filter(
            (id) => id !== req.user._id.toString()
          ),
        },
        {
          new: true,
        }
      );
    }
  }
  return res.status(200).send(result);
});

const getVoteCount = asyncHandler(async (req, res) => {
  let voteCount = 0;
  const result = await Post.find({ userId: req.user._id }).populate("vote");
  result.forEach((post) => {
    voteCount = voteCount + post.vote.vote;
  });
  return res.status(200).send({ voteCount: voteCount });
});

module.exports = { upVotePost, getVoteCount };
