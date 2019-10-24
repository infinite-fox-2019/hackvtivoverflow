const router = require('express').Router()
const QuestionController = require('../controller/question')
const AnswerController = require('../controller/answer')
const { authentication } = require('../middleware/auth')

router.get('/', QuestionController.getAll)
router.post('/', authentication, QuestionController.addQuestion)
router.get('/:questionId', QuestionController.getOne)
router.patch('/:questionId/upVote', authentication, QuestionController.upVote)
router.patch('/:questionId/downVote', authentication, QuestionController.downVote)

router.post('/:questionId/answer', authentication, AnswerController.addAnswer)
router.get('/:questionId/answer', authentication, AnswerController.getAll)
router.patch('/answer/:answerId/upVote', authentication, AnswerController.upVote)
router.patch('/answer/:answerId/downVote', authentication, AnswerController.downVote)


module.exports = router