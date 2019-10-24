const jwt = require('jsonwebtoken')

const secret = process.env.SECRET_JWT

function createToken(payload, expire = 3600) {
    return jwt.sign(payload, secret, { expiresIn: expire })
}

function verifyUser(token) {
    return jwt.verify(token, secret)
}

module.exports = { createToken, verifyUser }