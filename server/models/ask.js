const mongoose = require('mongoose')
const Schema = mongoose.Schema

const askSchema = new Schema({
    title: {
        type: String,
        require: [true, `Title must be filled`]
    },
    content: {
        type: String,
        require: [true, `Content must be filled`]
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    watcher: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('Ask', askSchema)