const Route = require('express').Router();
const QController = require('../controllers/questionController');
const { authentication, authorization } = require('../middlewares/auth');

Route.get('/', QController.findAll);
Route.get('/:id', authentication, authorization, QController.findOne);
Route.post('/ask', authentication, QController.create);
Route.get('/search/:id', QController.findOneQuestion);
Route.get('/search/tags/:name', QController.findByTag);

Route.get('/find/:name', QController.searchTitle);
Route.patch('/up', authentication, QController.updateUpVote);
Route.patch('/down', authentication, QController.updateDownVote)

module.exports = Route;