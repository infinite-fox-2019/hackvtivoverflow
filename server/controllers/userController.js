const {sign} = require('../helpers/jwt')
const {hash, compare} = require('../helpers/bcrypt')
const User = require('../models/User')

class UserController{
  static login(req, res, next){
    const {email, password} = req.body
    User.findOne({email})
      .then(user=>{
        if(user && compare(password, user.password)){
          const token = sign({_id: user._id, displayName: user.displayName})
          res.status(200).json({
            token,
            user_id : user._id
          })
        }
        else{
          res.status(401).json({
            msg: 'Wrong Email/Passwod'
          })
        }
      })
      .catch(next)
  }

  static register(req, res, next){
    const {displayName, email, password} = req.body
    const hassedPassword = hash(password)
    User.create({
      displayName,
      email,
      password: hassedPassword
    })
      .then(user=>{
        res.status(201).json(user)
      })
      .catch(next)
  }
}

module.exports = UserController