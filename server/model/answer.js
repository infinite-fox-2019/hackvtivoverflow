const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Answer = new Schema({
    question : {
        type : Schema.Types.ObjectId,
        ref: 'question'
    },
    answer: {
        type: String,
        required: [true, 'question required']
    },
    votes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        value: { type: Number }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true,
})

const Model = mongoose.model('answer', Answer)
module.exports = Model