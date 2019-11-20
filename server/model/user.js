const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    username : {
        type : String,
        required : [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
})

const Model = mongoose.model('user', User)
module.exports = Model