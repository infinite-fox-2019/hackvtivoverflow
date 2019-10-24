const Route = require('express').Router();
const QController = require('../controllers/questionController');
const { authentication, authorizationQuestion } = require('../middlewares/auth');

Route.get('/', QController.findAll);

Route.get('/profile', authentication, QController.findQuestionUser);
Route.get('/search/:id', QController.findOneQuestion);
Route.get('/search/tags/:name', QController.findByTag);
Route.get('/find/:name', QController.searchTitle);

Route.put('/:id', authentication, authorizationQuestion, QController.updateQuestion);
Route.post('/ask', authentication, QController.create);

Route.patch('/up', authentication, QController.updateUpVote);
Route.patch('/down', authentication, QController.updateDownVote);

Route.delete('/:id', authentication, authorizationQuestion, QController.deleteQuestion)

module.exports = Route;