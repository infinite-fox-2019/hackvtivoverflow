const Route = require('express').Router();
const { postMsg, readMsg } = require('../controllers/msgController')
const { authentication } = require('../middlewares/auth');

Route.use(authentication)
Route.get('/', readMsg);
Route.post('/', postMsg);

module.exports = Route;