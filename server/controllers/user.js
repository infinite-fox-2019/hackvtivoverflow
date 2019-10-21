'use strict'

const { generateToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcryptjs')
const { User } = require('../models')

class UserController {
  static register (req, res, next) {
    const { name, email, password } = req.body
    User.create({ name, email, password })
      .then((user) => {
        const payload = {
          id: user._id,
          email: user.email
        }
        const token = generateToken(payload)
        res.status(201).json({
          message: 'Successfully registered',
          token: token
        })
      })
      .catch(next)
  }

  static login (req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then((user) => {
        // Return a User object according to email
        if (user) {
          if (checkPassword(password, user.password)) {
            /// Create token using jsonwebtoken
            const payload = {
              id: user._id,
              name: user.name,
              email: user.email
            }
            const token = generateToken(payload)
            console.log(token)
            res.status(200).json({ message: 'User successfully signed in', token })
          } else {
            next({ status: 404, message: 'E-mail/password is invalid!' })
          }
        } else {
          next({ status: 404, message: 'E-mail/password is invalid!' })
        }
      }).catch(next)
  }

  static addTags (req, res, next) {
    const { tagUser } = req.body
    const { id } = req.decoded
    User.findByIdAndUpdate(id, {
      // Empty myTags array first
      $set: {
        myTags: []
      }
    }, {
      new: true,
      runValidators: true
    })
      .then((result) => {
        return User.findByIdAndUpdate(id, {
          $addToSet: {
            myTags: {
              $each: tagUser
            }
          }
        }, {
          new: true,
          runValidators: true
        })
          .then(result => {
            res.status(200).json(result)
          })
      })
      .catch(next)
  }

  static getMyTags (req, res, next) {
    const { id } = req.decoded
    User.findById(id)
      .then((result) => {
        const tags = result.myTags
        res.status(200).json(tags)
      }).catch(next)
  }
}

module.exports = UserController
