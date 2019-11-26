const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(10)

function generateHash(password){
  return bcrypt.hashSync(password,salt)
}

function compareHash(password,hash){
  return bcrypt.compareSync(password,hash)
}

module.exports = {generateHash,compareHash}