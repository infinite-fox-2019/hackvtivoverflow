const Route = require('express').Router();
const QController = require('../controllers/questionController');
const { authentication, authorization } = require('../middlewares/auth');

Route.get('/', QController.findAll);
Route.get('/:id', authentication, authorization, QController.findOne);
Route.post('/ask', authentication, QController.create);

module.exports = Route;