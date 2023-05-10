const { createAdmin, adminLogin } = require("../controllers/adminController");

const router = require("express").Router();

router.post("/", createAdmin);
router.post("/login", adminLogin);

module.exports = router;
