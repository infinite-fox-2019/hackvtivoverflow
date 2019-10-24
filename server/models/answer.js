const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  title: {
    type: String
  },
  description: {
    type: String,
    required: [true, 'Answer cannot be empty'] 
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
  
})


const answer = mongoose.model('Answer', answerSchema)
module.exports = answer
