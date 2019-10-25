const mongoose = require('mongoose')
const {hashPassword} = require('../helpers/bcryptjs')

let Schema = mongoose.Schema

let userSchema = new Schema({
    username: {
        type:String,required: [true, 'Username is Required']
    },
    email: {
        type:String,required: [true, 'Email is Required'], 
        unique: [true, 'Email is Already Taken']
    },
    password: {
        type:String,required: [true, 'Password is Required']
    }
}, {timestamps:true})

userSchema.pre('save',function(next){
    this.password = hashPassword(this.password)
    next()
})

let User = mongoose.model('User',userSchema)

module.exports = User