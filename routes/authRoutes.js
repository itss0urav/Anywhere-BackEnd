const express = require("express")
const router = express.Router()
const {loginController, registerUser} = require("../controllers/authController")


router.post("/login", loginController)
router.post("/register", registerUser)





module.exports = router
