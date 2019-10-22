const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const { hash } = require('../helpers/bcrypt.js')


const userSchema = new Schema({
  name: {type: String, required: true},
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
}, {versionKey: false, timestamps: true})


userSchema.pre('save', function(next){
  this.password = hash(this.password)
  next()
})

const User = model('User', userSchema)

module.exports = User