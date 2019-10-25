const QuestionController = require('../controllers/question')
const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/',QuestionController.read)
router.get('/search',QuestionController.findByTitle)
router.get('/question/:id',QuestionController.findById)

router.use(authentication)

router.post('/',QuestionController.create)

//give upvote to a question
router.patch('/question/:id/upvote',QuestionController.upvote)

//give downvote to a question
router.patch('/question/:id/downvote',QuestionController.downvote)

//clear this user's vote on a question
router.patch('/question/:id/clear-vote',QuestionController.clearVote)

router.delete('/question/:id',authorization,QuestionController.delete)

//Should be authorized user only
router.patch('/question/:id', authorization,QuestionController.update)
module.exports = router