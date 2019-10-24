const mongoose = require('mongoose')

let Schema = mongoose.Schema


let questionSchema = new Schema({
    title : {type:String,required: [true, 'title is required']},
    description : {type:String,required: [true, 'description is required']},
    userId : {
        type:  Schema.Types.ObjectId,
        ref:'User'
    },
    upvotes: {type:[Schema.Types.ObjectId],ref:'User',default:[]},
    downvotes: {type:[Schema.Types.ObjectId],ref:'User',default:[]}
},{timestamps:true})

let Question = mongoose.model('Question',questionSchema)

module.exports = Question