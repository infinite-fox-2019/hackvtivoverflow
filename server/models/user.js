const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcryptjs')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username required"],
        unique: [true, 'Username must be unique']
    },
    email: {
        type: String,
        required: [true, "Email required"],
        match: [/^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid Email Format"],
        unique: [true, 'Email must be unique']
    },
    password: {
        type: String,
        required: [true, "Password required"]
    }
}, { timestamps: true, versionKey: false })

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('Users', userSchema)

module.exports = User