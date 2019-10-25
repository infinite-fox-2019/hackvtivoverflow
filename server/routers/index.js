const routes = require("express").Router()
const UserRouter = require("./UserRouter")
const AnswerRouter = require("./AnswerRouter")
const QuestionRouter = require("./QuestionRouter")

routes.use("/", UserRouter)
routes.use("/question", QuestionRouter)
routes.use("/answer", AnswerRouter)

module.exports = routes