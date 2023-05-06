const router = require("express").Router()
const {getVerificationRequests, createVerificationRequests, updateApprovalState} = require("../controllers/verificationController")

router.route("/")
.get(getVerificationRequests)
.post(createVerificationRequests)
.patch(updateApprovalState)

module.exports = router