const { encrypt } = require('../helpers/hash')
const { decrypt } = require('../helpers/hash')
const { generateToken } = require('../helpers/token')
const User = require('../models/user')

class UserController {
  static signIn (req, res, next) {
    const {
      email,
      password
    } = req.body
    User.findOne({
      email
    }).then(user => {
      if (user) {
        if (decrypt(password, user.password)) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email
          }
          const token = generateToken(payload)
          res.status(200).json({
            token
          })
        }
      } else {
        res.status(404).json({
          message: 'user not found'
        })
      }
    }).catch(next)
  }

  static register (req, res, next) {
    const {
      email,
      password,
      name
    } = req.body
    User.create({
      name,
      email,
      password: encrypt(password)
    }).then(data => {
      res.status(201).json({
        data
      })
    })
      .catch(next)
  }

  static addTags (req, res, next) {
    const {
      tagKu
    } = req.body
    const {
      id
    } = req.decode

    User.findByIdAndUpdate(id, {
      $set: {
        myTags: []
      }
    }, {
      new: true,
      runValidators: true
    })
      .then(data => {
        return User.findByIdAndUpdate(id, {
          $addToSet: {
            myTags: {
              $each: tagKu
            }
          }
        }, {
          new: true,
          runValidators: true
        })
          .then(data => {
            res.status(200).json({
              data
            })
          })
      }).catch(next)
  }

  static getMyTags (req, res, next) {
    const { id } = req.decode
    User.findById(id)
      .then(data => {
        const tags = data.myTags
        res.status(200).json({
          tags
        })
      }).catch(next)
  }
}

module.exports = UserController
