const route = require('express').Router()
const QuestionController = require('../controllers/questionController');
const {authenticate, qAuthorize} = require('../middlewares/auth');

route.use(authenticate)
route.post('/', QuestionController.create)
route.patch('/upvote', QuestionController.upvote)
route.patch('/downvote', QuestionController.downvote)
route.get('/my', QuestionController.findMine)
route.get('/:id', QuestionController.findById)
route.get('/', QuestionController.find)
route.patch('/:id', qAuthorize, QuestionController.update)
route.delete('/:id', qAuthorize, QuestionController.delete)

module.exports = route