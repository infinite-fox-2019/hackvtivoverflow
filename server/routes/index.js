const router = require('express').Router()
const userRouter = require('./user')
const askRouter = require('./ask')
const answerRouter = require('./answer')
const tagRouter = require('./tag')

router.use('/user', userRouter)
router.use('/asks', askRouter)
router.use('/answers', answerRouter)
router.use('/tags', tagRouter)

module.exports = router