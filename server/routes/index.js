const router = require('express').Router()
const UserController = require('../controllers/user')
const QuestionController = require('../controllers/question')
const QuestionRoute = require('./question')
const AnswerRoute = require('./answer')

// cek status
router.get('/', (req, res) => {
  res.status(200).json({message: 'Hacktiv Overflow!'})
})

// question route
router.get('/questions', QuestionController.find)
router.get('/questions/:id', QuestionController.findQuestionId)
router.use('/questions', QuestionRoute)

// answer route
router.use('/answers', AnswerRoute)

// user login/register
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router