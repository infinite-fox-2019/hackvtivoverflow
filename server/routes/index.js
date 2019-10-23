const router = require('express').Router()
const userRoute = require('./userRoute')
const questionRoute = require('./questionRoute')
const answerRoute = require('./answerRoute')

router.use('/users', userRoute)
router.use('/questions', questionRoute)
router.use('/answers', answerRoute)


module.exports = router