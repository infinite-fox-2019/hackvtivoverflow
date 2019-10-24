const jwt = require('jsonwebtoken')
const secret = process.env.secret

function generateToken(payload) {
  return jwt.sign(payload, secret)
}

function verifyToken (token) {
  return jwt.verify(token,secret)
}

function sign(userData) {
  return jwt.sign(userData, process.env.secret)
}

module.exports = {
  generateToken,
  verifyToken,
  sign
}