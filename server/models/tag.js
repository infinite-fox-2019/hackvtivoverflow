const mongoose = require('mongoose')
const { Schema } = mongoose

const tagSchema = Schema({
    display: {
        type: String,
        required: [true, 'Display is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
}, {
    timestamps: true,
    versionKey: false
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag