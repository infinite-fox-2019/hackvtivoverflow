const router = require('express').Router()
const UserController = require('../controllers/userController')
const {authentication, authorization} = require('../middlewares/auth')

router.get('/', authentication, UserController.myAnswerNQuest)
router.patch('/upvote/:id', authentication, UserController.upVote)
router.patch('/downvote/:id', authentication, UserController.downVote)

module.exports = router