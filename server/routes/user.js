const router = require("express").Router()
const UserController = require("../controllers/user")

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/refresh/:token", UserController.refresh)

module.exports = router