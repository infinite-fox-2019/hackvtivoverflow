const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

answerSchema = new Schema({
    description : {
        type : String,
        required : [true, 'What is the answer??']
    },
    upvotes : [{
        type : ObjectId,
        ref : 'User'
    }],
    downvotes : [{
        type : ObjectId,
        ref : 'User'
    }],
    owner : {
        type : ObjectId,
        ref : 'User'
    }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer