const mongoose = require("mongoose");

//User schema

const categoryModel = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Categories", categoryModel);
