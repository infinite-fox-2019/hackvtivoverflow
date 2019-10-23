const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username must be filled'],
    minlength: [5, 'Username needs to be at least 5 characters']
  },
  password: {
    type: String,
    required: [true, 'Password must be filled'],
    minlength: [5, 'Password needs to be at least 5 characters']
  },
  email: {
    type: String,
    unique: [true, 'This email is already registered'],
    validate: [{
      validator: function (value) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: 'Invalid email format'
    }]
  }
})

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User