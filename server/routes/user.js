const UserController = require('../controllers/user')
const express = require('express')
const router = express.Router()

router.post('/login',UserController.login)
router.post('/register',UserController.register)
router.get('/',UserController.read)

module.exports = router