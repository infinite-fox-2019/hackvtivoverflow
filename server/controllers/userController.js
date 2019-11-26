const User = require('../models/userModel')
const getToken = require('../helpers/jwt').generateToken
const verifyHash = require('../helpers/bcrypt').compareHash

class UserController {

  static async add(req,res,next){
    try {
      let { email, password } = req.body
      const user = await User.findOne({email})
      if (user){
        let name = 'Email already in use'
        next({name})
      } else {
        if (password){
          let created = await User.create({email,password})
          let payload = {
            id:created._id
          }
          let token = getToken(payload) 
          res.status(200).json({token})
        } else {
          let name = 'Password cannot be empty'
          next({name})
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async findAll(req,res,next){
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req,res,next){
    try {
      let { _id } = req.params
      const user = await User.findOne({_id})
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }


  static async login(req,res,next){
    try {
      let {email,password} = req.body
      console.log(req.body);
      const user = await User.findOne({email})
      if(user){
        if (verifyHash(password,user.password)){
          let payload = {
            id:user._id
          }
          let token = getToken(payload)
          res.status(200).json({token})
        } else {
          let name = 'Email/password wrong'
          next({name})
        }
      } else {
        let name = 'Email/password wrong'
        next({name})
      }
    } catch (error) {
      
    }
  }



}




module.exports = UserController