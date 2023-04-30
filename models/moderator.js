const mongoose = require("mongoose");

//User schema

const moderatorModel = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps:true});

module.exports = mongoose.model("Moderator", moderatorModel);
