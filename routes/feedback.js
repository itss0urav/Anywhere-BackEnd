const {
  getFeedbacks,
  createFeedback,
  deleteFeedBack,
} = require("../controllers/feedbackController");

const router = require("express").Router();
router.route("/").get(getFeedbacks).post(createFeedback);

router.delete("/:id", deleteFeedBack);

module.exports = router;
