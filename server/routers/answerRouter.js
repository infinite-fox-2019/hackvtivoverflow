const router = require('express').Router()
const AnswerController = require('../controllers/answerController')
const {authorization,authentication} = require('../middleware/auth')

router.use(authentication)
router.post('/', AnswerController.createAnswer)
router.patch('/downvotes/:_id', AnswerController.updateDownvotes)
router.patch('/upvotes/:_id', AnswerController.updateUpvotes)

//Authorization here

router.delete('/:_id', AnswerController.deleteAnswer)
router.put('/:_id', AnswerController.editAnswer)

module.exports = router