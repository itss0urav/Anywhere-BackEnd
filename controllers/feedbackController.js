const asyncHandler = require("express-async-handler");
const Feedback = require("../models/feedback")



const createFeedback = asyncHandler(async (req, res) => {
    const response = await Feedback.create(req.body)

    return res.status(200).send(response)
})


const getFeedbacks = asyncHandler(async (req, res) => {

    const feedbacks = await Feedback.find({})

    return res.status(200).send(feedbacks)
})
const deleteFeedBack = asyncHandler(async (req, res) => {

    const deleted = await Feedback.findByIdAndDelete(req.params.id)

    return res.status(200).send(deleted)
})


module.exports = {createFeedback, getFeedbacks, deleteFeedBack}