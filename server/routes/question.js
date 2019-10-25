const router = require('express').Router()
const { authentication, questionAuthorization } = require('../middlewares/auth')
const QuestionController = require('../controllers/question')

// user authentication
router.use(authentication)

// create
router.post('/', QuestionController.create)

// read
router.get('/personal', QuestionController.findMyQuestion)

// update
router.put('/update/:id', questionAuthorization, QuestionController.updateQuestion)
router.put('/upvote/:id', questionAuthorization, QuestionController.upVote)
router.put('/downvote/:id', questionAuthorization, QuestionController.downVote)

// delete
router.delete('/delete/:id', questionAuthorization, QuestionController.deleteQuestion)

module.exports = router