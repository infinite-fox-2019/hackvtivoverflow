const {Schema, model} = require('mongoose')

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title must be filled']
  },
  description: {
    type: String,
    required: [true, 'Description must be filled']
  },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: []
    }
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: []
    }
  ],
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }  
}, {timestamps: true})

const Question = model('Question', questionSchema)

module.exports = Question