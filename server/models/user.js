const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Email invalid format']
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  watchTag: [{
    type: String
  }]
}, {
  timestamps: true,
  versionKey: false
})

userSchema.path('email').validate(function (value) {
  return User.findOne({ email: value })
      .then(result => {
          if (result) return false
      })
      .catch(err => {
          throw err;
      })
}, 'Email already exist')

userSchema.pre('save', function () {
  this.password = hashPassword(this.password)
  next()
})


const User = mongoose.model('User', userSchema)

module.exports = User

