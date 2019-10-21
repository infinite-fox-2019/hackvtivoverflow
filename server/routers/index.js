const router = require('express').Router()
const usersRouter = require('./user')

router.get('/', (req, res, next) => {
  res.status(200).json({hello: 'world'})
})
router.use('/users', usersRouter)

module.exports = router