const router = require("express").Router();
const secure = require("../middlewares/authorization");
const {
  createPost,
  updatePost,
  getPosts,
  deletePost,
  getTrendingPosts,
} = require("../controllers/postController");

router.route("/").post(secure, createPost).patch(updatePost).get(getPosts);
router.delete("/:id", deletePost);
router.get("/trending", getTrendingPosts)

module.exports = router;
