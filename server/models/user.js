const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require("../helpers/bcrypt")
const uniqueValidator = require('mongoose-unique-validator');
const validate = require("mongoose-validator");

const emailValidate = [
    validate({
      validator: 'isEmail',
      message: 'Email format is incorrect',
    })
  ]

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username Must Not Be Blank"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email Must Not Be Blank"],
        validate: emailValidate,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password Must Not Be Blank"]
    }
})

UserSchema.plugin(uniqueValidator, { message: '{PATH} is already taken' })

UserSchema.pre("save", function(next) {
    this.password = hashPassword(this.password)
    next()
})


const User = mongoose.model('User', UserSchema)

module.exports = User