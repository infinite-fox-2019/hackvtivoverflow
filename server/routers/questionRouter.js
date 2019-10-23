const router = require('express').Router()
const questionController = require('../controllers/questionController')
const {authentication,authorization} = require('../middleware/auth')

router.get('/', questionController.questionList)
router.get('/:id', questionController.questionDetail)

router.use(authentication)

router.post('/', questionController.createQuestion)
router.patch('/upvotes/:id', questionController.updateUpvotes)
router.patch('/downvotes/:id', questionController.updateDownvotes)

// authorization here

router.delete('/:id', questionController.deleteQuestion)
router.put('/:id', questionController.editQuestion)


module.exports = router