const router = require('express').Router()
const QuestionController = require('../controllers/question')
const { authentication } = require('../middlewares/auth')

router.use(authentication)
router.post('/', QuestionController.add)
router.get('/', QuestionController.findAll)

module.exports = router