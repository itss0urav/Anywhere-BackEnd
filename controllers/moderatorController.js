const asyncHandler = require("express-async-handler");
const Moderator = require("../models/moderator");
const User = require("../models/user");

const createModerator = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const moderartor = await User.findOneAndUpdate(
    { email },
    {
      role: "moderator",
    }
  );

  return res.status(200).send(moderartor);
});

const deleteModerator = asyncHandler(async (req, res) => {
  const { email } = req.params;

  const user = await User.findOneAndUpdate(
    { email },
    {
      role: "user",
    }
  );

  return res.status(200).send(user);
});

module.exports = { deleteModerator, createModerator };
