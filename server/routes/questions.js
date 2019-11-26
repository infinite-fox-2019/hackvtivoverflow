const questions = require('express').Router()
const { add,findAll,findOne,upvote,downvote,remove,scoring,update } = require('../controllers/questionController')
const auth = require('../middlewares/auth').authentication

questions.get('/',findAll)
questions.get('/score/:_id',scoring)
questions.get('/:_id',findOne)
questions.post('/add', auth, add)
questions.patch('/upvote/:_id',auth,upvote)
questions.patch('/downvote/:_id',auth,downvote)
questions.delete('/:_id',auth,remove)
questions.patch('/:_id',auth,update)

module.exports = questions
