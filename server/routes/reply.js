const Router = require('express').Router();
const ReplyController = require('../controllers/reply')
const authentication = require('../middlewares/authentication')
const { reply } = require('../middlewares/authorization')

Router.use(authentication)
Router.post('/', ReplyController.create)
Router.get('/', ReplyController.read)
Router.put('/:replyId', reply, ReplyController.update)


module.exports = Router;