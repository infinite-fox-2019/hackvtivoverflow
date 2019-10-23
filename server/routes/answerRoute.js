const router = require('express').Router()
const answerController = require('../controller/answerControler')
const { authentication, authorizationAnswer } = require('../middleware/auth')

router.post('/', authentication, answerController.create)
router.get('/user', authentication, answerController.findByUser)
router.get('/search', answerController.search)
router.get('/question/:questionId', answerController.findByQuestionId)
router.get('/:id', authentication, authorizationAnswer, answerController.findById)
router.patch('/:id', authentication, authorizationAnswer, answerController.update)
router.delete('/:id', authentication, authorizationAnswer, answerController.delete)


module.exports = router