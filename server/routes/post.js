const routes = require('express').Router()
const PostController = require('../controllers/post')

routes.post('/', PostController.create)
routes.get('/', PostController.findAll)
routes.get('/:id', PostController.findOne)
routes.delete('/:id', PostController.delete)

module.exports = routes
