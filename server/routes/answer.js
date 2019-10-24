const answer = require('express').Router()
const {findAll, findOne, add, upvote, downvote, remove, scoring,findSpecificUser,update} = require('../controllers/answerControllers')
const auth = require('../middlewares/auth').authentication

answer.get('/',findAll)
answer.get('/score/:_id',scoring)
answer.get('/specific/:_id',auth,findSpecificUser)
answer.get('/:_id',findOne)
answer.post('/add',auth,add)
answer.patch('/upvote/:_id',auth,upvote)
answer.patch('/downvote/:_id',auth,downvote)
answer.patch('/:_id',auth,update)
answer.delete('/:_id',auth,remove)


module.exports = answer