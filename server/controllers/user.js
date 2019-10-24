const User = require('../models/user')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jsonwebtoken')

class UserController {
  static register (req, res, next) {
    const { name, email, password } = req.body
    User
      .create({
        name,
        email,
        password
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static login (req, res, next) {
    const { email, password } = req.body
    User
      .findOne({
        email // cek email user login
      })
      .then(result => {
        if (result && comparePassword(password, result.password)) {
          const payload = {
            id: result._id,
            name: result.name,
            email: result.email
          }
          const token = generateToken(payload)
          res.status(200).json({
            token,
            name: result.name,
            email: result.email
          })
        } else {
          next({
            statusCode: 401,
            msg: 'invalid email/password'
          })
        }
      })
      .catch(next)
  }
}

module.exports = UserController