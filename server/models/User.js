const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  displayName:  {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  comments: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Comment' 
  }],
  posts: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Post' 
  }]
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User