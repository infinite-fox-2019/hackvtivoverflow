const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title Must Not Be Blank"]
    },
    description: {
        type: String,
        required: [true, "Description Must Not Be Blank"]
    },
    upvote: [ObjectId],
    downvote: [ObjectId],
    user: {
        type: ObjectId,
        ref: "User"
    },
    created_at: {
        type: Date
    }
})

QuestionSchema.pre("save", function(next) {
    this.created_at = Date.now()
    next()
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question