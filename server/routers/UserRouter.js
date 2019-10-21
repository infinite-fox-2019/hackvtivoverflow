const UserController = require("../controllers/UserController")
const routes = require("express").Router()
const { authentication } = require("../middlewares/authentication")

routes.post("/register", UserController.create)
routes.post("/login", UserController.login)
routes.get("/user", authentication, UserController.findOne)

module.exports = routes