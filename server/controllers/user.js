const User = require('../models/user')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const { username, password, email } = req.body

    User
      .create({
        username,
        password,
        email
      })
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(next)
  }

  static login(req, res, next) {

    const { email, password } = req.body

    User
      .findOne({ email })
      .then(user => {
        if (user && checkPassword(password, user.password)) {
          const payload = {
            _id: user._id,
            email: user.email
          }
          const token = generateToken(payload)
          res.status(200).json({ token, username: user.username, id: user._id })
        } else if (user) {
          res.status(404).json({ message: 'Invalid Password' })
        } else {
          res.status(404).json({ message: 'User does not exist' })
        }
      })
      .catch(next)
  }
}

module.exports = UserController