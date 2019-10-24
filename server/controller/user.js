const User = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{
  static register(req, res, next){
    let { username, email, password } = req.body
    User.create({ username, email, password })
      .then(user => {
        let token = generateToken({_id: user._id})
        res.status(201).json({
          username: user.username,
          token
        })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { identity, password } = req.body;
    User.findOne({ $or: [{ username: identity }, { email: identity }] })
      .then((user) => {
        if (user && comparePassword(password, user.password)) {
          const token = generateToken({ _id: user._id })
          res.status(200).json({
            username: user.username,
            token: token,
          })
        } else {
          next({ status: 401, message: 'Wrong Username / Email / Password' })
        }
      })
      .catch(next);
  }
}

module.exports = UserController
