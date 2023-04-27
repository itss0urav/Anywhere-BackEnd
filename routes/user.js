const { getUsers, deleteUser } = require("../controllers/usercontroller")
const router = require("express").Router()

router.route("/").get(getUsers)
router.delete("/:id",deleteUser)



module.exports = router