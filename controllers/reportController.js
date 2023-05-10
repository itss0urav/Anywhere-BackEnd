const asyncHandler = require("express-async-handler");
const Report = require("../models/Report")



const createReport = asyncHandler(async (req, res) => {

    const response = await Report.create(req.body)

    if(!response) return res.status(500).send("Somethig wend wrong")

    return res.status(200).send(response)
})
const getReportedPosts = asyncHandler(async (req, res) => {

    const response = await Report.find({}).populate("postId").populate("userId")

    if(!response) return res.status(500).send("Somethig wend wrong")

    return res.status(200).send(response)
})
const deleteReport = asyncHandler(async (req, res) => {
     const {postId} = req.params
    const response = await Report.deleteMany({postId})


    if(!response) return res.status(500).send("Somethig wend wrong")

    return res.status(200).send(response)
})





module.exports = {createReport, getReportedPosts, deleteReport}

