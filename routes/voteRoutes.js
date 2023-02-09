const router = require("express").Router();
const { upVotePost } = require("../controllers/voteController");

router.patch("/", upVotePost);

module.exports = router;
