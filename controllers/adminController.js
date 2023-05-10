const asyncHandler = require("express-async-handler");
const Admin = require("../models/admin");

const createAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.create(req.body);

  return res.status(200).send(admin);
});
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const foundAdmin = await Admin.findOne({ email });
  const verifyPassword = foundAdmin?.password === password;

  if (!verifyPassword)
    return res.status(400).send("Unauthorized, incorrect password or email");

  return res.status(200).send(foundAdmin);
});

module.exports = { createAdmin, adminLogin };
