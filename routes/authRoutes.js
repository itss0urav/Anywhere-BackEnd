const express = require("express")
const router = express.Router()
const {loginController, registerUser} = require("../controllers/authController")
const allowAcess = require("../middlewares/acessControlOrigin")

router.post("/login",loginController)
router.post("/register", registerUser)





module.exports = router
