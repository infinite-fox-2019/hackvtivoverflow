const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Question = new Schema({
    title : {
        type : String,
        required : [true , 'title required'],
    },
    question : {
        type : String,
        required : [true , 'question required']
    },
    votes : [ {
        user : { 
            type : Schema.Types.ObjectId, 
            ref : 'user' },
        value : { type : Number }
    } ],
    tags : [ String ] ,
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    answer : [ {type: Schema.Types.ObjectId, ref : 'answer'} ]
}, { 
    timestamps : true,
})

const Model = mongoose.model('question', Question)
module.exports = Model