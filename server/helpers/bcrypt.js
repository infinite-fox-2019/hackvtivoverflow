const bcrypt = require('bcryptjs')
const SALT = bcrypt.genSaltSync(10)

function hashPassword(password) {
  return bcrypt.hashSync(password, SALT)
}

function comparePassword(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword)
}


module.exports = { hashPassword, comparePassword }