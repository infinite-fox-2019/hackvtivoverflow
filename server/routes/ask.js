const router = require('express').Router()
const askController = require('../controllers/ask')
const { Authentication, Authorization } = require('../middlewares/auth')

router.get('/', askController.find)
router.get('/myask', Authentication, askController.myAsk)
router.get('/:id', askController.findById)
router.post('/', Authentication, askController.create)
router.patch('/upvote/:id', Authentication, askController.upvote)
router.patch('/downvote/:id', Authentication, askController.downvote)
router.put('/:id', Authentication, Authorization, askController.update)
router.delete('/:id', Authentication, Authorization, askController.remove)

module.exports = router