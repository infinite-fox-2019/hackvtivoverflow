const Route = require('express').Router();
const AController = require('../controllers/answerController.js');
const { authentication } = require('../middlewares/auth');

//find by QuestionId ==> semua paramsnya QuestionId

Route.post('/:id', authentication, AController.create);
Route.get('/:id', AController.findId);

module.exports = Route;