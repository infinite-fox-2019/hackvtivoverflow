const router = require('express').Router()
const usersRouter = require('./user')
const questionsRouter = require('./question')
const answersRouter = require('./answer')

router.get('/', (req, res, next) => {
  res.status(200).json({hello: 'world'})
})
router.use('/users', usersRouter)
router.use('/questions', questionsRouter)
router.use('/answers', answersRouter)

module.exports = router