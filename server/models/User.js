const mongoose = require('mongoose')
const { Schema } = mongoose
const { hashPassword } = require('../helpers/bcryptjs')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Display name cannot be empty.']
  },
  email: {
    type: String,
    required: [true, 'The email is not a valid email address.'],
    unique: true,
    validate: {
      validator: (v) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(v).toLowerCase());
      },
      message: props => `${ props.value } is not a valid email address.`
    }
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty.'],
    min: [8, 'Must contain at least 8 characters.'],
    validate: {
      validator: (v) => {
        let re = /[A-Za-z0-9]*([a-zA-Z]+[0-9]+|[0-9]+[a-zA-Z]+)/
        return re.test(v)
      },
      message: props => `Password must include at least 1 letter and 1 number.`
    }
  }
}, {
  versionKey: false
})

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
