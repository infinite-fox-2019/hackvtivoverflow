const router = require('express').Router()
const answerController = require('../controllers/answer')
const { Authentication, Authorization } = require('../middlewares/auth')

router.use(Authentication)
router.post('/:askId', answerController.create)

module.exports = router