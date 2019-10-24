const User = require('../models/User')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')

module.exports = {
  register: (req, res, next) => {
    const { username, email, password } = req.body
    User.create({ username, email, password })
    .then(user => {
      res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
        access_token: generateToken({ username, email })
      })
    })
    .catch(next)
  },
  login: (req, res, next) => {
    const { email, password } = req.body
    User.findOne({ email })
    .then(user => {
      if(!user || !comparePassword(password, user.password)) {
        throw {status: 400, msg: 'The email or password is incorrect.'}
      } else {
        res.status(200).json({
          id: user._id,
          username: user.username,
          email: user.email,
          access_token: generateToken({ username: user.username, email })
        })
      }
    })
    .catch(next)
  }
}