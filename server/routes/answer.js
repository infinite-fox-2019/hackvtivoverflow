const router = require('express').Router()
const answerController = require('../controllers/answer')
const { Authentication, Authorization } = require('../middlewares/auth')

router.use(Authentication)
router.post('/:askId', answerController.create)
router.put('/:id', Authorization, answerController.update)
router.patch('/upvote/:id', answerController.upvote)
router.patch('/downvote/:id', answerController.downvote)
router.delete('/:id', answerController.remove)

module.exports = router