const mongoose = require("mongoose");

//Feedback schema

const feedBackModel = new mongoose.Schema({
  userId: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model("Feedback", feedBackModel);
