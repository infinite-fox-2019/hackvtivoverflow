const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/commentController')
const {authentication, authorization} = require('../middlewares/authentication')

router.use(authentication)

router.post('/', CommentController.addComment) 

router.patch('/', CommentController.editComment)

router.delete('/', CommentController.deleteComment)

router.post('/upvotes/add/:id', CommentController.addUpVote)

router.post('/upvotes/remove/:id', CommentController.removeUpVote)

router.post('/downvotes/add/:id', CommentController.addDownVote)

router.post('/downvotes/remove/:id', CommentController.removeDownVote)

module.exports = router