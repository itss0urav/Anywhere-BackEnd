const router = require("express").Router();
const secure = require("../middlewares/authorization");
const {
  createPost,
  updatePost,
  getPosts,
  deletePost,
} = require("../controllers/postController");

router.route("/").post(secure, createPost).patch(updatePost).get(getPosts);
router.delete("/:id", deletePost);

module.exports = router;
