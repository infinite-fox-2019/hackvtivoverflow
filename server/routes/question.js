const router = require('express').Router()
const QuestionController = require('../controllers/questionController')
const {authentication, authorization} = require('../middlewares/auth')

router.get('/',  QuestionController.getQuest)
router.get('/:id',  QuestionController.getDetail)
router.post('/', authentication, QuestionController.makeQuest)
router.patch('/:id', authentication, authorization, QuestionController.updateQuest)
router.delete('/:id', authentication, authorization, QuestionController.deleteQuest)


module.exports = router