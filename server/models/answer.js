const { Schema, model } = require('mongoose')

const answerSchema = new Schema({
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
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const answer = model('answer', answerSchema)

module.exports = answer
