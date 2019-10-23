const mongoose = require('mongoose')
const { Schema } = mongoose

const answerSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is missing']
  },
  description: {
    type: String,
    required: [true, 'Body is missing']
  },
  upvotes: {
    type: Array,
    default: []
  },
  downvotes: {
    type: Array,
    default: []
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }
}, {
  versionKey: false
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer