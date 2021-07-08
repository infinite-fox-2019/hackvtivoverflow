const router = require('express')()
const UserController = require('../controllers/user')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router