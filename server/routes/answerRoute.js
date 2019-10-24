const router = require('express').Router()
const AnswerController = require('../controllers/answer')
const auth = require('../middlewares/auth')
const authorize = require('../middlewares/authorizeAnswer')

router.delete('/:id', auth, authorize, AnswerController.remove)
router.get('/:questionId', AnswerController.getAllA)
router.post('/:questionId', auth, AnswerController.createA)
router.patch('/desc/:id', auth, authorize, AnswerController.updateDesc)
router.patch('/upvote/:id', auth, AnswerController.upvote)
router.patch('/downvote/:id', auth, AnswerController.downvote)

module.exports = router