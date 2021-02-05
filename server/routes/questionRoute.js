const router = require('express').Router()
const QuestionController = require('../controllers/question')
const auth = require('../middlewares/auth')
const authorize = require('../middlewares/authorizeQuestion')

router.get('/find/:id', QuestionController.getOneQ)
router.delete('/:id', auth, authorize, QuestionController.remove)
router.get('/all', QuestionController.getAllQ)
router.patch('/edit/:id', auth, authorize, QuestionController.update)
router.patch('/downvote/:id', auth, QuestionController.downvote)
router.post('/', auth, QuestionController.createQ)
router.get('/', auth, QuestionController.getUserQ)
router.patch('/upvote/:id', auth, QuestionController.upvote)

module.exports = router