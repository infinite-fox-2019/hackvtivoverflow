const routes = require('express').Router();
const user = require('./user')
const post = require('./post')

routes.use('/user', user)
routes.use('/post', post)

module.exports = routes