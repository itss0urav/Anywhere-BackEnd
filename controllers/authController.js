const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { hashPassword, verifyPassword } = require("../configs/hashPassword");
const {
  generateAccessToken,
} = require("../configs/authorization/jwtSign");
const Moderator = require("../models/moderator")
//@route auth/register
//@desc Creating a new user
//@acess public

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  if (username && email && password) {
    //Checking duplicate user by email

    const duplicateUser = await User.findOne({ email: email });

    if (duplicateUser)
      return res
        .status(409)
        .json({ message: `The emailid ${email} already exists}` });

    //Calling hash password function to hash the provided password
    const hashedPassword = await hashPassword(password);

    if (hashedPassword) {
      const userObj = {
        username: username,
        email: email,
        password: hashedPassword,
      };

      //Creating new user
      const user = await User.create(userObj);
      if (!user)
        return res.status(500).json({ message: "Failed to create user" });
      return res.status(201).json({
        message: "New user created sucessfully",
        username: user.username,
        email: user.email,
      });
    }
  }
});

const loginController = asyncHandler(async (req, res) => {
  console.log(req.cookies.jwt);
  const { email, password } = req.body;

  console.log(req.socket.remotePort);
  //Check wheather the user exists

  if (!email || !password)
    return res
      .status(404)
      .json({ message: "Please provide essential details" });

  const foundedUser = await User.findOne({ email: email });

  if (!foundedUser)
    return res.status(404).json({ message: " This email doenot exists " });

  const passwordVerified = await verifyPassword(password, foundedUser.password);

  if (!passwordVerified)
    return res.status(401).json({ message: "Incorrect password" });

    const isModerator = await Moderator.findOne({email})
    const accessToken = generateAccessToken({id:foundedUser._id, role:isModerator ? "moderator" : "user"});
  
  return res.status(200).json({
    message: "Logged in succesfully",
    accessToken,
    username:foundedUser.username,
    userId:foundedUser._id
  });
});

module.exports = { registerUser, loginController };
