const { decodeToken } = require('../helpers/jwt')
const User = require('../models/User')
const Question = require('../models/Question')

authentication = (req, res, next) => {
  // console.log(req.headers.access_token)
  if(!req.headers.access_token) {
    throw {status: 401, msg:'You have to login first'}
  }
  // console.log('masuksss')
  let email = decodeToken(req.headers.access_token).email 
  User.findOne({email})
  .then(user => {
    if(!user) {
      throw {status: 401, msg:'You have to login first'}
    } else {
      req.loggedUser = user
      // console.log('masuk next')
      next()
    }
  })
  .catch(next)
}

authorizationQuestion = (req, res, next) => {
  console.log(req.params, 'aaaaa')
  Question.findById(req.params.id)
  .then(question => {
    if(!question) {
      throw {status: 404, message: 'Question data not found'}
    } else {
      console.log(question.user, req.loggedUser._id)
      if(String(question.user) !== String(req.loggedUser._id)) {
        throw {status: 401, message: 'You are unauthorized to access this data'}
      } else {
        next()
      }
    }
  })
  .catch(next)
}

authorizationAnswer = (req, res, next) => {
  console.log(req.params, 'aaaaa')
  Answer.findById(req.params.id)
  .then(answer => {
    if(!answer) {
      throw {status: 404, message: 'Answer data not found'}
    } else {
      console.log(answer.user, req.loggedUser._id)
      if(String(answer.user) !== String(req.loggedUser._id)) {
        throw {status: 401, message: 'You are unauthorized to access this data'}
      } else {
        next()
      }
    }
  })
  .catch(next)
}

module.exports = {
    authentication,
    authorizationQuestion,
    authorizationAnswer
}