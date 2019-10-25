const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: [true, "Title of question is required!"]
  },
  description: {
    type: String,
    required: [true, "Description of question require!"]
  },
  tag: [],
  upVote: [],
  downVote: [],
  value: Number
})

QuestionSchema.pre('save', function (next) {
  this.value = this.upVote.length - this.downVote.length
  next()
})

const Question = mongoose.model('Question', QuestionSchema)
module.exports = Question