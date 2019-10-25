const router = require("express").Router()
const AnswerController = require("../controllers/answer")
const { authentication, authorizedAnswer } = require("../middlewares/auth")

router.use(authentication)
router.get("/", AnswerController.findByUser)
router.get("/:question/", AnswerController.findAll)
router.get("/:question/:id", AnswerController.findOne)
router.post("/:question/upvote/:id", AnswerController.upvote)
router.post("/:question/downvote/:id", AnswerController.downvote)
router.use("/:question/:id", authorizedAnswer)
router.post("/:question/", AnswerController.create)
router.patch("/:question/:id", AnswerController.update)

module.exports = router
