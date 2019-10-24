const router = require('express').Router()
const UserController = require('../controller/UserController')
const { authentication } = require('../middleware/auth')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/userid', authentication, UserController.getUserId)

module.exports = router