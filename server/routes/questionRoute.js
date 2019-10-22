const route = require('express').Router()
const QuestionController = require('../controllers/questionController');
const {authenticate, qAuthorize} = require('../middlewares/auth');

route.get('/', QuestionController.find)
route.use(authenticate)
route.post('/', QuestionController.create)
route.get('/:id', QuestionController.findByUser)
route.patch('/:id', qAuthorize, qAuthorize,QuestionController.update)
route.delete('/:id', qAuthorize, QuestionController.delete)

module.exports = route