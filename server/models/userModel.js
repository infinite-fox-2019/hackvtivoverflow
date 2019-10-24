const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getHash = require('../helpers/bcrypt').generateHash

const users = new Schema({
    email : {
      type : String,
      required : [true, 'email is requred'],
      match : [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,'Email format is invalid']
    },
     password : {
       type : String,
       required : [true, 'password is required']
     }
})

users.pre('save',function(next){
  this.password = getHash(this.password)
  next()
})


const User = mongoose.model('User',users)

module.exports = User