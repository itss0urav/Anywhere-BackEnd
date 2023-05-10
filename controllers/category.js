const asyncHandler = require("express-async-handler");
const Category = require("../models/Categories");

//get category

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  return res.status(200).send(categories);
});

module.exports = { getCategories };
