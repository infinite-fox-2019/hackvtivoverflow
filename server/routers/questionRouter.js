const router = require('express').Router()
const questionController = require('../controllers/questionController')

router.get('/', questionController.questionList)

module.exports = router