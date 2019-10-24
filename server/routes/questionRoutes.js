const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const {authentication, authorizationQuestion} = require('../middlewares/auth')

router.get('/', QuestionController.readAll)

router.use(authentication)

router.post('/', QuestionController.create)
router.get('/myquestion', QuestionController.readByUserId)
router.get('/:id', QuestionController.readById)
router.put('/upvote/:id', QuestionController.upVote)
router.put('/downvote/:id', QuestionController.downVote)
router.put('/view/:id', QuestionController.view)

router.put('/:id', authorizationQuestion, QuestionController.update)
router.delete('/:id', authorizationQuestion, QuestionController.delete)

module.exports = router