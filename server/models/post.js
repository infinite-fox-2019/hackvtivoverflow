const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema ({
  title: {
    type: String,
    required: [true, 'Title Cannot be Empty']
  },
  description: {
    type: String,
    required: [true, 'Description Cannot be Empty']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  vote: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    value: Number
  }]
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)
module.exports = Post