const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
    ask: [{
        type: Schema.Types.ObjectId,
        ref: 'Ask'
    }],
    watcher: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('Tag', tagSchema)