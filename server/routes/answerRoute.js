const route = require('express').Router()
const AnswerController = require('../controllers/answerController');
const {authenticate, aAuthorize} = require('../middlewares/auth');

route.use(authenticate)
route.get('/', AnswerController.find)
route.post('/', AnswerController.create)
route.patch('/:id', aAuthorize , AnswerController.update)
route.delete('/:id', aAuthorize , AnswerController.delete)

module.exports = route
