const router = require('express').Router();
const authentication = require('../middlewares/authentication')
const QuestionController = require('../controllers/questionController')
const {questionAuth} = require('../middlewares/authorization')

router.get('/', QuestionController.getAll)
router.post('/', authentication, QuestionController.create)
router.get('/tag/:tag', QuestionController.filterTag)
router.get('/owned', authentication, QuestionController.userQuestion)
router.patch('/up/:id', authentication, QuestionController.likeQuestion)
router.patch('/down/:id', authentication, QuestionController.dislikeQuestion)
router.get('/:id', QuestionController.getOne)
router.put('/:id', authentication, questionAuth, QuestionController.updatePut)
router.delete('/:id', authentication, questionAuth, QuestionController.delete)

module.exports = router