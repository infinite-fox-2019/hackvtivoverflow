const User = require('../models/user')
const { check } = require('../helpers/hashPassword')
const {
  verifyToken,
  generateToken
} = require('../helpers/jwt')

class UserController {

  static readAll (req,res,next) {
    User.find({}).populate({
      path: 'questions',
      populate: {
        path: 'userId',
        path: 'answers'
      }
    })
      .then(function (users) {
        res.status(200).json(users)
      })
      .catch(next)
  };

  static create(req,res,next) {
    
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(function (newUser) {
      res.status(201).json(newUser)
    })
    .catch(next)
  }

  static login (req,res,next) {
    console.log(req.body)
    User.findOne({
      username: req.body.username
    })
    .then(function (user) {
      if (user) {
        if (check(req.body.password, user.password)) {
          let payload = { id : user.id }
          let token = generateToken(payload)
          req.headers.token = token
          res.status(200).json(token)
        }
      }else {
        res.status(404).json({message: 'Invalid username / password'})
      }
    })
    .catch(next)
  }


}

module.exports = UserController