const User = require('../models/user')
const { compare } = require('../helpers/bcrypt')
const { verifyToken, generateToken} = require('../helpers/jwt')

class UserController {
  static register ( req, res, next) {
    const {name, email, password} = req.body
    User.create({name, email, password})
      .then(user=>{
        res.status(201).json({message: 'Successfully registered. Please login.', user})
      })
      .catch(next)
  }
  static login (req, res, next) {
    const {email, password} = req.body
    User.findOne({email})
      .then(user=>{
        if(user && compare(password, user.password)){
          const token = generateToken({id: user._id})
          res.status(200).json({token})
        } else {
          res.status(401).json({message: 'wrong email/password'})
        }
      })
      .catch(next)
  } 
  static verify (req, res, next) {
    try {
      verifyToken(req.headers.token)
      res.status(200).json({message: 'user verified'})
    }
    catch (err){
      next(err)
    }
  }
}

module.exports = UserController