const Route = require('express').Router();
const AController = require('../controllers/answerController.js');
const { authentication } = require('../middlewares/auth');

//find by QuestionId ==> semua paramsnya QuestionId

Route.post('/:id', authentication, AController.create);

//ini idQuestion
Route.get('/:id', AController.findId);

Route.patch('/up', authentication, AController.updateUpAnswer);
Route.patch('/down', authentication, AController.updateDownVote);

module.exports = Route;