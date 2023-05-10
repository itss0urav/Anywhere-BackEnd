const {
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const router = require("express").Router();

router.route("/").get(getUsers).patch(updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
