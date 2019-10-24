const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please input title']
  },
  desc: {
    type: String,
    required: [true, 'Please input description']
  },
  upvotes: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  downvotes: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const question = mongoose.model('question', questionSchema)

module.exports = question
