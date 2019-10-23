const router = require('express').Router()
const AnswerController = require('../controllers/answerController')
const {authorization,authentication} = require('../middleware/auth')

router.use(authentication)
router.post('/', AnswerController.createAnswer)
router.patch('/downvotes/:id', AnswerController.updateDownvotes)
router.patch('/upvotes/:id', AnswerController.updateUpvotes)

//Authorization here

router.delete('/:id', AnswerController.deleteAnswer)
router.put('/:id', AnswerController.editAnswer)

module.exports = router