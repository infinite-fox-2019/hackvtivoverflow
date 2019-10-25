const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: 'User' },
  questionId: { type: Schema.ObjectId, ref: 'Question' },
  answer: {
    type: String,
    required: [true, 'Please enter your answer!']
  },
  upVote: [],
  downVote: [],
  value: Number
})

AnswerSchema.pre('save', function (next) {
  this.value = this.upVote.length - this.downVote.length
  next()
})

const Answer = mongoose.model('Answer', AnswerSchema)
module.exports = Answer