const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const uniqueValidator = require('mongoose-unique-validator');

const AnswerSchema = new Schema({
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
    question: {
        type: ObjectId,
        ref: "Question",
        required: [true, "Question Id Is Required"],
        unique: true
    },
    user: {
        type: ObjectId,
        ref: "User"
    },
    created_at: {
        type: Date
    }
})

AnswerSchema.plugin(uniqueValidator, { message: 'You answered this already' })

AnswerSchema.pre("save", function(next) {
    this.created_at = Date.now()
    next()
})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer