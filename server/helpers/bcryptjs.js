const bcrypt = require('bcryptjs')

module.exports = {
  hashPassword: function (input) {
    return bcrypt.hashSync(input, bcrypt.genSaltSync(10))
  },
  comparePassword: function (input, hash) {
    return bcrypt.compareSync(input, hash)
  }
}