const { createModerator, deleteModerator } = require("../controllers/moderatorController")

const router = require("express").Router()

router.route("/").post(createModerator)
router.delete("/:email",deleteModerator)

module.exports = router