const router = require("express").Router()
const QuestionController = require("../controllers/question")
const { authentication, authorizedQuestion } = require("../middlewares/auth")

router.get("/all", QuestionController.findGlobal)
router.use(authentication)
router.post("/upvote/:id", QuestionController.upvote)
router.post("/downvote/:id", QuestionController.downvote)
router.get("/", QuestionController.findAll)
router.get("/:id", QuestionController.findOne)
router.use("/:id", authorizedQuestion)
router.post("/", QuestionController.create)
router.patch("/:id", QuestionController.update)
router.delete("/:id", QuestionController.deleteOne)

module.exports = router