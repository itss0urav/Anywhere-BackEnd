const router = require("express").Router();
const { upVotePost } = require("../controllers/voteController");
const secure = require("../middlewares/authorization")
router.post("/",secure, upVotePost);

module.exports = router;
