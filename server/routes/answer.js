const AnswerController = require('../controllers/answer')
const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')

router.get('/',AnswerController.read)

router.use(authentication)

router.post('/answer',AnswerController.create)
router.patch('/answer/:id',AnswerController.update)
router.delete('/:id',AnswerController.delete)

module.exports = router