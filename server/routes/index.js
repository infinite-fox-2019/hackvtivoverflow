'use strict'

const router = require('express').Router()
// const userRouter = require('./user')
// const questionRouter = require('./question')
// const answerRouter = require('./answer')
// const voteRouter = require('./vote')

router.get('/', (req, res) => {
  res.status(200).json({ page: 'Home', message: 'Connected to HacktivOverflow Apps!' })
})

// Routing
// router.use('/users', userRouter)
// router.use('/questions', questionRouter)
// router.use('/answers', answerRouter)
// router.use('/votes', voteRouter)

module.exports = router
