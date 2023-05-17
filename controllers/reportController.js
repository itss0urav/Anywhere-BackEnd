const asyncHandler = require("express-async-handler");
const Report = require("../models/Report");
const Post = require("../models/post");
const createReport = asyncHandler(async (req, res) => {
  const response = await Report.create(req.body);

  if (!response) return res.status(500).send("Somethig wend wrong");

  return res.status(200).send(response);
});
const getReportedPosts = asyncHandler(async (req, res) => {
  let result = [];
  const response = await Report.find({}).populate("userId");
  for (let report of response) {
    const postId = report.postId.toString();
    const clonedReport = JSON.parse(JSON.stringify(report));
    const postInfo = await Post.find({ _id: postId })
      .populate("vote")
      .populate("userId");
    clonedReport.postId = JSON.parse(JSON.stringify(postInfo));
    result.push(clonedReport);
  }
  if (!response) return res.status(500).send("Somethig wend wrong");
  return res.status(200).send(result);
});

const getReportedPostForAdmin = asyncHandler(async(req, res) => {
  const response = await Report.find({}).populate("userId").populate("postId")
  return res.status(200).send(response)
})

const deleteReport = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const response = await Report.deleteMany({ postId });

  if (!response) return res.status(500).send("Somethig wend wrong");

  return res.status(200).send(response);
});

module.exports = { createReport, getReportedPosts, deleteReport, getReportedPostForAdmin };
