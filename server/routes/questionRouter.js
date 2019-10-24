const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const {authentication, authorizationQuestion} = require('../middlewares/auth')

router.get('/',QuestionController.read)
// router.use(authentication)

router.get('/personal',authentication,QuestionController.readPersonal)
router.get('/:id',authentication,QuestionController.readOne)
// buat get question by id
// buat get question by personal

router.post('/',authentication,QuestionController.create)
router.put('/:id',authentication,authorizationQuestion,QuestionController.update)
router.delete('/:id',authentication,authorizationQuestion,QuestionController.delete)
router.put('/upvote/:id',authentication,QuestionController.upvote)
router.put('/downvote/:id',authentication,QuestionController.downvote)


module.exports =router