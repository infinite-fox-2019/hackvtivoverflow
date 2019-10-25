const router = require('express').Router()
const questionController = require('../controllers/questionController')
const {authentication,authorization} = require('../middleware/auth')

router.get('/', questionController.questionList)
router.get('/:_id', questionController.questionDetail)

router.use(authentication)

router.post('/', questionController.createQuestion)
router.patch('/upvotes/:_id', questionController.updateUpvotes)
router.patch('/downvotes/:_id', questionController.updateDownvotes)

// authorization here

router.delete('/:_id', questionController.deleteQuestion)
router.put('/:_id', questionController.editQuestion)


module.exports = router