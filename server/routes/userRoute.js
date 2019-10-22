const route = require('express').Router()
const UserController = require('../controllers/userController')

route.post('/login', UserController.login)
route.post('/register', UserController.register)
route.get('/verify', UserController.verify)

module.exports = route
