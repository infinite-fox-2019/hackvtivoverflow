const route = require('express').Router()
const QuestionController = require('../controllers/questionController');
const {authenticate, qAuthorize} = require('../middlewares/auth');

route.use(authenticate)
route.get('/', QuestionController.find)
route.get('/my', QuestionController.findMine)
route.post('/', QuestionController.create)
route.patch('/upvote', QuestionController.upvote)
route.patch('/downvote', QuestionController.downvote)
route.get('/:id', QuestionController.findById)
route.patch('/:id', qAuthorize, qAuthorize,QuestionController.update)
route.delete('/:id', qAuthorize, QuestionController.delete)

module.exports = route