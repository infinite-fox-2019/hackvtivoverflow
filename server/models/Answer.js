const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AnswerSchema = new Schema ({
    title: {
        type: String,
        required: [true, "Title can't be empty"]
    },
    description: {
        type: String,
        required: [true, "Description can't be empty"]
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    QuestionId : {
        type: Schema.Types.ObjectId,
        ref: "Questions"
    },
    upVotes: {
        type: Array
    },
    downVotes: {
        type: Array
    }
}, {
    versionKey: false
})


const Answer = mongoose.model("Answers", AnswerSchema)

module.exports = Answer