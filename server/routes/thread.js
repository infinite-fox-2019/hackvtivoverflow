const Router = require('express').Router();
const ThreadController = require('../controller/thread')
const ReplyController = require('../controller/reply')
const authentication = require('../middlewares/authentication')
const { reply, thread } = require('../middlewares/authorization')

Router.get('/', ThreadController.read)
Router.get('/user', authentication, ThreadController.readOwner)
Router.get('/:id', ThreadController.readOne)

Router.use(authentication)

Router.post('/', ThreadController.create)
Router.post('/reply', ReplyController.create)
Router.patch('/upvote', ThreadController.upvote)
Router.patch('/downvote', ThreadController.downvote)

Router.put('/:id', thread, ThreadController.update)


module.exports = Router;