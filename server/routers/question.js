const router = require('express').Router()
const QuestionController = require('../controllers/question')
const { authentication, authorizationQuestion } = require('../middlewares/auth')

router.use(authentication)
router.post('/', QuestionController.add)
router.get('/', QuestionController.findAll)
router.get('/:id', QuestionController.findById)
router.patch('/upvote/:id', QuestionController.upvote)
router.patch('/downvote/:id', QuestionController.downvote)
router.patch('/:id', authorizationQuestion, QuestionController.update)
router.delete('/:id', authorizationQuestion, QuestionController.delete)

module.exports = router