const express = require("express")
const router = express.Router()
const {loginController, logoutController} = require("../controllers/authController")


router.get("/login",loginController)
router.get("/logout", logoutController)




module.exports = router
