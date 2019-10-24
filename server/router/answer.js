const router = require('express').Router()
const Controller = require('../controllers/answer')
const { authentication , authorization } = require('../middlewares/auth')

router.patch('/upvote/:id', authentication, Controller.upvote)
router.patch('/downvote/:id', authentication , Controller.downvote)
router.post('/:id' , authentication , Controller.create)
router.patch('/:id', authentication , Controller.update)
router.get('/' , authentication , Controller.userAnswer)


module.exports = router