const getTopComments = require("../controllers/overviewController")

const router = require("express").Router()


router.get("/:postId", getTopComments)


module.exports = router