const router = require('express').Router();
const AnswerController = require('../controllers/answerController')
const authentication = require('../middlewares/authentication')
const {answerAuth} = require('../middlewares/authorization')

router.get('/:id', AnswerController.getOneAnswer)
router.post('/:id', authentication , AnswerController.create)
router.patch('/up/:id', authentication, AnswerController.likeAnswer)
router.patch('/down/:id', authentication, AnswerController.dislikeAnswer)
router.patch('/:id', authentication, answerAuth, AnswerController.updateAnswer)

module.exports = router