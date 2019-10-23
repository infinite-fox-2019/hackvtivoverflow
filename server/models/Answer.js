const mongoose = require('mongoose')
const Schema = mongoose.Schema


const answerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'userId is required' ]
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question"
    },
    title: {
        type: String,
        required: [true, 'title is required' ]
    },
    description: {
        type: String,
        required: [true, 'description is required' ]
    },
    votes: {
        Types: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('Answer', answerSchema)