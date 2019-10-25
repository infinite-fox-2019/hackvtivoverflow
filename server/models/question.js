const mongoose = require('mongoose')

let Schema = mongoose.Schema

let questionSchema = new Schema({
    title: {type:String,required: [true, 'Title is Required']},
    description: {type:String,required: [true, 'Description is Required']},
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    answersId: {type: [Schema.Types.ObjectId], ref: "Answer", default:[]},
    upvotes: {type: [Schema.Types.ObjectId], ref: "User", default:[]},
    downvotes: {type: [Schema.Types.ObjectId], ref: "User", default:[]},
    views: {type: [Schema.Types.ObjectId], ref: "User", default:[]}
}, {timestamps:true})

let Question = mongoose.model('Question',questionSchema)

module.exports = Question