const {
  createReport,
  getReportedPosts,
  deleteReport,
  getReportedPostForAdmin,
} = require("../controllers/reportController");

const router = require("express").Router();

router.route("/").post(createReport).get(getReportedPosts);

router.delete("/:postId", deleteReport);

router.get("/admin", getReportedPostForAdmin)

module.exports = router;
