const User = require("../models/user")
const asyncHandler = require("express-async-handler")

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    return res.status(200).send(users)
})

const deleteUser = asyncHandler(async (req, res) => {
    const result = await User.findByIdAndDelete(req.params.id)

    return res.status(200).send(result)
})

module.exports = {getUsers, deleteUser}