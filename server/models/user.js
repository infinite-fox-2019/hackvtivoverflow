const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')
const Tag = require('./tag')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Email invalid format']
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  watchTag: [{
    type: String
  }]
}, {
  timestamps: true,
  versionKey: false
})

userSchema.path('email').validate(function (value) {
  return User.findOne({ email: value })
      .then(result => {
          if (result) return false
      })
      .catch(err => {
          throw err;
      })
}, 'Email already exist')

userSchema.pre('save', function () {
  this.password = hashPassword(this.password)
  let id = this._id.toString()
  Tag.updateMany({users : {$all: [id]}}, {$pull:{ users: id}})
  .then(() =>{
    Tag.updateMany({ name : { $in: this.watchTag }}, {$push:{users : id}})
    .then(data => {
      console.log(data);
    })
  })
  next()
})

userSchema.pre('findOneAndUpdate', function(next){
  let _id = this.getQuery()._id
  let id = _id.toString()
  let watchTag = this.getUpdate().watchTag
  Tag.updateMany({users : {$all: [_id]}}, {$pull:{ users: id}})
  .then(data =>{
    Tag.updateMany({ name : { $in: watchTag }}, {$push:{users : id}})
    .then(data => {
      next()
    })
  })

})

const User = mongoose.model('User', userSchema)

module.exports = User

