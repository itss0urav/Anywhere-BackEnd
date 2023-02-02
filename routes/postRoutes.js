const router = require("express").Router()
const {createPost, upVotePost} = require("../controllers/postController")

router.route("/")
.post(createPost)
.patch(upVotePost)


module.exports = router