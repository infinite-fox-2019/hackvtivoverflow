const router = require('express').Router()
const AnswerController = require('../controllers/answer')
const { authentication, authorizationAnswer } = require('../middlewares/auth')

router.use(authentication)
router.post('/', AnswerController.add)
router.post('/', authorizationAnswer, AnswerController.update)
router.patch('/upvote/:id', AnswerController.upvote)
router.patch('/downvote/:id', AnswerController.downvote)

module.exports = router