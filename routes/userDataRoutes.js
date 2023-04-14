const router = require('express').Router();
const secure = require("../middlewares/authorization")
const { getUserData } = require('../controllers/userDataController')

router.get("/",secure, getUserData)


module.exports = router