const router = require("express").Router();
const secure = require("../middlewares/authorization")
const {createComment, getComments, deleteComment} = require("../controllers/commentController")


router.route("/").post(secure, createComment).get(getComments)
router.delete("/:id", deleteComment)

module.exports = router