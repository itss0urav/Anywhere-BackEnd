const router = require("express").Router();
const {
  createPost,
  updatePost,
  getPosts,
} = require("../controllers/postController");


router.route("/").post(createPost).patch(updatePost).get(getPosts);

module.exports = router;
