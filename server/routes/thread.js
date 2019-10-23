const Router = require('express').Router();
const ThreadController = require('../controllers/thread')
const authentication = require('../middlewares/authentication')
const { reply, thread } = require('../middlewares/authorization')
const ReplyController = require('../controllers/reply')


Router.get('/', ThreadController.read)
Router.get('/user', authentication, ThreadController.readOwner)
Router.get('/:id', ThreadController.readOne)

Router.use(authentication)

Router.post('/', ThreadController.create)
Router.patch('/upvote', ThreadController.upvote)
Router.patch('/downvote', ThreadController.downvote)
Router.patch('/unvote', ThreadController.unvote)

Router.delete('/:id', thread, ThreadController.delete)
Router.delete('/:id/:replyId', reply, ReplyController.delete)
Router.put('/:id', thread, ThreadController.update)




module.exports = Router;