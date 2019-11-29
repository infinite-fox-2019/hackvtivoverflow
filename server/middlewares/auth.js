const { decodeToken } = require('../helpers/jwt');
const User = require('../models/user');
const Question = require('../models/questions');
const Answer = require('../models/answer');

function authentication (req,res,next) {
  try{
    if (req.headers.token) {
      const decode = decodeToken(req.headers.token);
      if (decode) {
        req.loggedUser = decode;
        next()
      } else {
        throw error
      }
    } else {
      throw error
    }
  }
  catch(err){
    next({ msg: 'authen' })
  }
}

function authorizationQuestion (req,res,next) {
  try{
    Question.findById({
    _id: req.params.id
    })
    .then(question => {
      console.log(question.UserId)
      console.log(req.loggedUser.id)
      if(!question) throw { msg: '0Q' }
      else {
      if(question.UserId == req.loggedUser.id) {
        console.log('masuk di perkondisian next()')
        next()
      } else {
        throw {msg: 'author'}
      }
      }
    })
    .catch(next)
  }
  catch(err) {
    next(err)
  }
}

function authorizationAnswer (req,res,next) {
  try {
  Answer.findById({
    _id: req.params.id
  })
    .then(answer => {
    if(!answer) throw {msg: '0A'}
    else {
      if(answer.UserId == req.loggedUser._id) {
      next()
      } else {
      throw {msg: 'author'}
      }
    }
    })
    .catch(next)
  }
  catch(err) {
  next(err)
  }
}

module.exports = {
  authentication,
  authorizationQuestion,
  authorizationAnswer
}