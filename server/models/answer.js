const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number
  },
  downvotes: {
    type: Number
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer