const mongoose = require("mongoose")
const Schema = mongoose.Schema

const QuestionSchema = new Schema ({
    title: {
        type: String,
        required: [true, "Title can't be empty"]
    },
    description: {
        type: String,
        required: [true, "Content can't be empty"]
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    votes: {
        type: Number
    },
    tags: {
        type: String
    }
}, {
    versionKey: false
})


const Question = mongoose.model("Questions", QuestionSchema)

module.exports = Question