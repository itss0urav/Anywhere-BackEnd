const router = require("express").Router();
const secure = require("../middlewares/authorization")
const {createComment, getComments} = require("../controllers/commentController")


router.route("/").post(secure, createComment).get(getComments)


module.exports = router