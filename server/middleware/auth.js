const { verifyedToken } = require('../helpers/jwt')

function authentication(req, res, next) {
  try {
    let decodeToken = verifyedToken(req.headers.token)
    req.logedUser = decodeToken
    next()
  } catch {
    res.status(500).json('You are not authentication!')
  }
}


module.exports = { authentication }