const answerController = require('../controllers/answerController')
const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

router.get('/', auth, answerController.readAll)
router.post('/:id', auth,answerController.create)

module.exports = router