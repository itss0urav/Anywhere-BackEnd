const router = require("express").Router();
const { upVotePost, getVoteCount, getVotes } = require("../controllers/voteController");
const secure = require("../middlewares/authorization");
router.post("/", secure, upVotePost).get("/", secure, getVoteCount);
router.get("/getVotes", getVotes)
module.exports = router;
