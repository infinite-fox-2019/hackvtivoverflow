const router = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const {authentication, authorizationAnswer} = require('../middlewares/auth')

router.use(authentication)

router.post('/:questionId', AnswerController.create)
router.get('/:questionId', AnswerController.readByQuestionId)
router.put('/upvote/:id', AnswerController.upVote)
router.put('/downvote/:id', AnswerController.downVote)

router.put('/:id', authorizationAnswer, AnswerController.update)

module.exports = router