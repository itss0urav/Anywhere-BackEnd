const router = require("express").Router()
const {createPost, updatePost} = require("../controllers/postController")

router.route("/")
.post(createPost)
.patch(updatePost)


module.exports = router