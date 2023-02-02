const router = require("express").Router()
const {createPost} = require("../controllers/postController")

router.route("/").post(createPost)


module.exports = router