const mongoose = require("mongoose");

//User schema

const userModel = new mongoose.Schema({
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
  isBanned:{
    type:Boolean,
    required:false
  }
},{timestamps:true});

module.exports = mongoose.model("User", userModel);
