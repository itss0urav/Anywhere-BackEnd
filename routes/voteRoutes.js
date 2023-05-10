const router = require("express").Router();
const { upVotePost, getVoteCount } = require("../controllers/voteController");
const secure = require("../middlewares/authorization");
router.post("/", secure, upVotePost).get("/", secure, getVoteCount);

module.exports = router;
