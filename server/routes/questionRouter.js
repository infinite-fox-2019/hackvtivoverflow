const questionController = require('../controllers/questionController')
const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

router.get('/', auth,questionController.readAll)
router.post('/',auth,questionController.create)
router.delete('/:id/delete', auth,questionController.delete)
router.patch('/:id/upvote', auth, questionController.upvote)
router.patch('/:id/downvote', auth, questionController.downvote)

module.exports = router