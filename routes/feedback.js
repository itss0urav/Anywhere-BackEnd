const { getFeedbacks, createFeedback } = require("../controllers/feedbackController")

const router = require("express").Router()
router.route("/").get(getFeedbacks).post(createFeedback)



module.exports = router