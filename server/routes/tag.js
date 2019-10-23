const Router = require('express').Router();
const TagController = require('../controllers/tag');
const authentication = require('../middlewares/authentication')


Router.get('/', TagController.read)
Router.get('/click', TagController.clicked)

Router.use(authentication)

Router.get('/watch', TagController.watch)
Router.get('/unwatch', TagController.unwatch)


module.exports = Router;

