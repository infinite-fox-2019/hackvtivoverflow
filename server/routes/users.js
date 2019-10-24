const user = require('express').Router()
const { add,findAll,findOne,login } = require('../controllers/userController')

user.get('/',findAll)
user.get('/:_id',findOne)
user.post('/login',login)
user.post('/add',add)

module.exports = user