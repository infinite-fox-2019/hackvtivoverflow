const Route = require('express').Router();
const UController = require('../controllers/userController');
const { authentication } = require('../middlewares/auth');

Route.get('/', authentication, UController.findOneUserforState);
Route.post('/login', UController.login);
Route.post('/register', UController.register);

module.exports = Route;