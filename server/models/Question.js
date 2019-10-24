const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'userId is required']
    },
    title: {
        type: String,
        required: [true, 'title is required' ]
    },
    description: {
        type: String,
        required: [true, 'description is required' ]
    },
    upvotes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
    downvotes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
    tags: [String]

}, { timestamps: true })


const Question = mongoose.model('Question', questionSchema )

module.exports = Question