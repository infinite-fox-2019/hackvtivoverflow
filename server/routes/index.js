const Router = require('express').Router();
const user = require('./user')
const reply = require('./reply')
const tag = require('./tag')
const thread = require('./thread')

Router.get('/', (req, res) => res.status(200).json({ message: 'connected to server' }))

Router.use('/users', user)
Router.use('/reply', reply)
Router.use('/tags', tag)
Router.use('/threads', thread)

Router.use('/*', (req, res, next) => next({ status: 404, message: "API route not found" }))

module.exports = Router;