const const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    content: {
        type: String,
        required: [true, `Content must be filled`]
    },
    upvaote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('Answer', answerSchema)