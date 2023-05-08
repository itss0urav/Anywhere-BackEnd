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


module.exports = {createFeedback, getFeedbacks}