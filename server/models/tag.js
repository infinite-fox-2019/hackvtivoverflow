const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, `Name Tag must be filled`]
    },
    desc: {
        type: String,
        required: [true, `Desc Tag must be filled`]
    },
    watcher: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('Tag', tagSchema)