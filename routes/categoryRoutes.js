const { getCategories } = require("../controllers/category");

const router = require("express").Router();

router.get("/", getCategories);

module.exports = router;
