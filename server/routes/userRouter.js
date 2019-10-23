const router = require('express').Router();
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.create)
router.post('/login', UserController.login)
router.patch('/watchtag', authentication, UserController.updateTag)

module.exports = router