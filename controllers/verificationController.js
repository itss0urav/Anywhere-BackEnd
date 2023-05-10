const asyncHandler = require("express-async-handler");
const Verification = require("../models/verification");

const getVerificationRequests = asyncHandler(async (req, res) => {
  const requests = await Verification.find({}).populate("userId");

  return res.status(200).send(requests);
});

//controller for creating new verification requests

const createVerificationRequests = asyncHandler(async (req, res) => {
  const result = await Verification.create(req.body);

  return res.status(200).send(result);
});

//controller for updating the approval state

const updateApprovalState = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  delete req.body["_id"];

  const result = await Verification.findByIdAndUpdate(_id, req.body);

  return res.status(200).send(result);
});

module.exports = {
  getVerificationRequests,
  createVerificationRequests,
  updateApprovalState,
};
