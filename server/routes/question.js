'use strict'

const router = require('express').Router()
const { QuestionController } = require('../controllers')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')

router.get('/', QuestionController.getQuestions)
router.use(authentication)
router.get('/user', QuestionController.getUserQuestion)
router.get('/user/:id', QuestionController.getOneQuestion)
router.post('/create', QuestionController.createQuestion)
router.patch('/:id', authorization, QuestionController.updateQuestion)
router.delete('/:id', authorization, QuestionController.removeQuestion)
router.patch('/upvote/:id', QuestionController.upvote)
router.patch('/downvote/:id', QuestionController.downvote)
router.patch('/create-tags', QuestionController.createTags)
router.get('/tags/:tag', QuestionController.getTagsByName)

module.exports = router
