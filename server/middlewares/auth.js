const { decodeToken } = require('../helpers/jsonwebtoken')
const User = require('../models/user')
const Question = require('../models/question')

module.exports = {
  authentication: function (req, res, next) {
    try {
      req.loggedUser = decodeToken(req.headers.token) // token dari headers
      User.findOne({
        _id: req.loggedUser.id
      })
      .then(result => {
        if (!result) {
          next({
            statusCode: 401,
            msg: 'Unauthorized'
          })
        } else {
          next()
        }
      })
    }
    catch {next({
      statusCode: 401,
      msg: 'Unauthorized'
    })}
  },
  questionAuthorization: function (req, res, next) {
    Question
      .findOne({
        _id: req.params.id
      })
      .then(result => {
        if (result.owner == req.loggedUser.id) {
          next()
        } else {
          next({
            statusCode: 403,
            msg: 'not authorized'
          })
        }
      })
      .catch(next({
        statusCode: 404,
        msg: 'Not found'
      }))
  }
}
