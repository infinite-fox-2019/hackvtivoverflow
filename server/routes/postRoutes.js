const express = require('express')
const router = express.Router()
const PostController = require('../controllers/postController')
const {authentication, authorization} = require('../middlewares/authentication')

router.use(authentication)

router.get('/', PostController.getPost)

router.get('/:id', PostController.getOnePost)

router.post('/', PostController.addPost)

router.post('/search/:search', PostController.getPostSearch)

router.delete('/', authorization,PostController.deletePost)

router.patch('/', authorization,PostController.editPost)

router.post('/views/:id', PostController.addViews)

router.post('/upvotes/add/:id', PostController.addUpVote)

router.post('/upvotes/remove/:id', PostController.removeUpVote)

router.post('/downvotes/add/:id', PostController.addDownVote)

router.post('/downvotes/remove/:id', PostController.removeDownVote)

module.exports = router