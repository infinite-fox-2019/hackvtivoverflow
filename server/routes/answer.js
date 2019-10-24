const router = require('express').Router()
const AnswerController = require('../controllers/answerController')
const {authentication, authorization} = require('../middlewares/auth')

// router.get('/', authentication, AnswerController.getAns)
router.post('/:id', authentication, AnswerController.makeAns)
router.patch('/:id', authentication, authorization, AnswerController.updateAnswer)
router.delete('/:id', authentication, authorization, AnswerController.deleteAnswer)

module.exports = router