const router = require('express').Router()
const user = require('./user')
const question = require('./question')

router.use('/user', user)
router.use('/question', question)

module.exports = router