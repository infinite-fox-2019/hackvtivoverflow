const routes = require('express').Router()
const user = require('./users')
const question = require('./questions')
const answer = require('./answer')

routes.use('/users',user)
routes.use('/questions',question)
routes.use('/answers',answer)

module.exports = routes