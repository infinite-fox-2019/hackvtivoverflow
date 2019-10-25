const router = require('express').Router()
const { authentication } = require('../middlewares/auth')
const AnswerController = require('../controllers/answer')

// user authentication
router.use(authentication)

// create
router.post('/:questionId', AnswerController.create)

// read
router.get('/question/:questionId', AnswerController.findByQuestion)
router.get('/:id', AnswerController.findAnswerId)

// update
router.put('/update/:id', AnswerController.updateAnswer)
router.put('/upvote/:id', AnswerController.upVote)
router.put('/downvote/:id', AnswerController.downVote)

module.exports = router