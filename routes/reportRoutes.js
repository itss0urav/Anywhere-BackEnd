const {
  createReport,
  getReportedPosts,
  deleteReport,
} = require("../controllers/reportController");

const router = require("express").Router();

router.route("/").post(createReport).get(getReportedPosts);

router.delete("/:postId", deleteReport);

module.exports = router;
