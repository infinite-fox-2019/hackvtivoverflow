const Route = require('express').Router();
const { create, findId, findAnswerUser, updateDownVote, updateUpAnswer, deleteAnswer } = require('../controllers/answerController.js');
const { authentication, authorizationAnswer } = require('../middlewares/auth');

//find by QuestionId ==> semua paramsnya QuestionId

Route.post('/:id', authentication, create);

//ini idQuestion
Route.get('/:id', findId);
Route.get('/', authentication, findAnswerUser);

Route.patch('/up/:id', authentication, updateUpAnswer);
Route.patch('/down/:id', authentication, updateDownVote);

Route.delete('/:id', authentication, deleteAnswer)

module.exports = Route;