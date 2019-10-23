const router = require('express').Router()
const usersRouter = require('./user')
const questionsRouter = require('./question')

router.get('/', (req, res, next) => {
  res.status(200).json({hello: 'world'})
})
router.use('/users', usersRouter)
router.use('/questions', questionsRouter)

module.exports = router