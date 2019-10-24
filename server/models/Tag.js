const mongoose = require('mongoose')
const Schema = mongoose.Schema


const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Tag name is required']
    },
    desc: {
        type: String,
        required: [true, 'Description is required']
    },
    watcher:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},{ timestamps: true })

module.exports = mongoose.model('Tag', tagSchema)