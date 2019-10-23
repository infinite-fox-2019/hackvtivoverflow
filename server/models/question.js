const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionShema = new Schema({
  title: {
    type : String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  upvotes: [Schema.Types.ObjectId],
  downvotes: [Schema.Types.ObjectId],
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  AnswerId: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }]
})

const Question = mongoose.model('Question', questionShema)
module.exports = Question