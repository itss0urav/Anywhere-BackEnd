const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const { hashPassword, verifyPassword } = require('../configs/hashPassword')
const {generateAccessToken, generateRefreshTokenToken} = require("../configs/authorization/jwtSign")



//@route auth/register
//@desc Creating a new user
//@acess public

const registerUser = asyncHandler(async (req, res) => {
console.log(req.body)
    const { username, email, password } = req.body

    if (username && email && password) {

        //Checking duplicate user by email

        const duplicateUser = await User.findOne({ email: email })

        if (duplicateUser) return res.status(409).json({ message: `The emailid ${email} already exists}` })

        //Calling hash password function to hash the provided password
        const hashedPassword = await hashPassword(password)

        if (hashedPassword) {

            const userObj = {
                username: username,
                email: email,
                password: hashedPassword
            }

            //Creating new user 
            const user = await User.create(userObj)
            if (!user) return res.status(500).json({ message: "Failed to create user" })
            return res.status(201).json({
                message: "New user created sucessfully",
                username: user.username,
                email: user.email
            })

        }

    }

})

const loginController = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    console.log(req.socket.remotePort)
    //Check wheather the user exists

    if (!email || !password) return res.status(404).json({ message: "Please provide essential details" })

    const foundedUser = await User.findOne({ email: email })

    if (!foundedUser) return res.status(404).json({ message: " This email doenot exists " })

    const passwordVerified = await verifyPassword(password, foundedUser.password)

    if (!passwordVerified) return res.status(401).json({ message: "Incorrect password" })
    
    const accessToken = generateAccessToken(foundedUser._id)
    const refreshToken = generateRefreshTokenToken(foundedUser._id)
    
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })
    
    return res.status(200).json({
        message: "Logged in succesfully",
        accessToken 
    })


})


module.exports = { registerUser, loginController }