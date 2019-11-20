const router = require('express').Router()
const Controller = require('../controllers/question')
const { authentication , authorization } = require('../middlewares/auth')

router.patch('/upvote/:id', authentication, Controller.upvote)
router.patch('/downvote/:id', authentication , Controller.downvote)
router.post('/' , authentication , Controller.create)
router.patch('/:id', authentication , Controller.update)
router.delete('/:id', authentication, Controller.delete)
router.get('/' , Controller.find)
router.get('/user' , authentication , Controller.findUser)
router.get('/tag' , Controller.tag)

module.exports = router