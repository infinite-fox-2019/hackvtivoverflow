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
  upvotes: {
    type: Number
  },
  downvotes: {
    type: Number
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Question = mongoose.model('Question', questionShema)
module.exports = Question