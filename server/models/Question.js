const mongoose = require('mongoose')
const { Schema } = mongoose

const questionSchema = new Schema({
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
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answer',
    }
  ]
}, {
  versionKey: false
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question