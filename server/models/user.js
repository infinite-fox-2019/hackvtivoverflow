const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [4, 'Username should be between 4-20 characters length'],
        maxlength: [20, 'Username should be between 4-20 characters length'] 
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : true,
        validate : [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type : String,
        required : [true, 'Password is required']
    }
})

userSchema.pre('save', function() {
    this.password = hashPassword(this.password)
  });

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

const User = mongoose.model('User', userSchema)

module.exports = User