const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {generateHash} = require('../helpers/bcrypt')

const userSchema = new Schema({
  name : {
    type:String, 
    required: "Name is required"},
  email : {
    type:String, 
    required: "Email is required", 
    unique: "This email has been used by other user",
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  password : {
    type :  String,
    required : "Password required"
  }
})

userSchema.pre('save', function(next){
  this.password = generateHash(this.password)
  next()
})

const User = mongoose.model("User", userSchema);
module.exports = User