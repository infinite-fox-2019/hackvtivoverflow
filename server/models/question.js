const mongoose = require('mongoose')
const Schema = mongoose.Schema


const questionSchema = new Schema ({
  title: {
    type: String,
    required: [true, 'Title cannot be empty']
  },
  description: {
    type: String,
    required: [true, 'Description cannot be empty']
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  answers: [
    {
      type:Schema.Types.ObjectId,
      ref: 'Answer'
    }
  ],
  userId: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Question', questionSchema)