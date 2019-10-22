const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const { hashPassword } = require('../helpers/hash');
const validate = require('mongoose-validator');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [
            validate({
                validator: 'isEmail',
                message: 'Invalid email'
            })
        ],
    },
    password: {
        type: String,
        require: true
    },
    createdAt: Date
})

UserSchema.pre('save', function (next) {
    this.password = hashPassword(this.password);
    this.createdAt = new Date();
    next()
})

const User = Mongoose.model('users', UserSchema);

User.createCollection()
    .then(_=>{
        console.log('User Collection Created');
    })
    .catch(err=>{
        console.log(err);
    })

module.exports = User;