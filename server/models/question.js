const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

questionSchema = new Schema({
    title : {
        type : String,
        required : [true, 'Question title is required']
    },
    description : {
        type : String,
        required : [true, 'Describe the question please']
    },
    upvotes : [{
        type : ObjectId,
        ref : 'User'
    }],
    downvotes : [{
        type : ObjectId,
        ref : 'User'
    }],
    tags : [],
    answers : [{
        type : ObjectId,
        ref : 'Answer'
    }],
    owner : {
        type : ObjectId,
        ref : 'User'
    }
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question