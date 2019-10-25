const router = require('express').Router()
const userRoutes = require('./userRoutes')
const questionRoutes = require('./questionRoutes')
const answerRoutes = require('./answerRoutes')

router.use('/',userRoutes)
router.use('/question',questionRoutes)
router.use('/answer',answerRoutes)

module.exports = router