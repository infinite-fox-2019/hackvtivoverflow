const answer = require('./answer')
const question = require('../routes/question')
const vote = require('../routes/vote')
const user = require('../routes/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({ page: 'Home', message: 'Connected to Hacktivoverflow Apps!' })
})

router.use('/answer', answer)
router.use('/question', question)
router.use('/vote', vote)
router.use('/user', user)

module.exports = router
