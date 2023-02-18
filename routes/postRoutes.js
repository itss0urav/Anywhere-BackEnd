const router = require("express").Router();
const secure = require("../middlewares/authorization")
const {
  createPost,
  updatePost,
  getPosts,
} = require("../controllers/postController");


router.route("/").post(secure,createPost).patch(updatePost).get(getPosts);

module.exports = router;
