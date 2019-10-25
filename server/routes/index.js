const router = require('express').Router()
const questionRoute = require('./questionRoute')
const answerRoute = require('./answerRoute')
const userRoute = require('./userRoute')

router.use('/questions', questionRoute)
router.use('/answers', answerRoute)
router.use('/users', userRoute)

module.exports = router