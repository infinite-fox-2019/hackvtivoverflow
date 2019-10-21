const Router = require('express').Router();
const user = require('./user')

Router.get('/', (req, res) => res.status(200).json({ message: 'connected to server' }))

Router.use('/users', user)

module.exports = Router;