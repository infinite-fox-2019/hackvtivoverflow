const routes = require("express").Router()
const AnswerController = require("../controllers/AnswerController")
const { authorizationAnswer } = require("../middlewares/authorization")
const { authentication } = require("../middlewares/authentication")

routes.get("/", AnswerController.findAll)
routes.post("/", authentication, AnswerController.create)
routes.get("/:id", authentication, authorizationAnswer, AnswerController.findOne)
routes.patch("/:id", authentication, authorizationAnswer, AnswerController.updateAnswer)
routes.delete("/:id", authentication, authorizationAnswer, AnswerController.deleteAnswer)
routes.patch("/", authentication, authorizationAnswer, AnswerController.vote)

module.exports = routes