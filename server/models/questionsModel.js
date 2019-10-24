const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const questions = new Schema({
  userId : {type: Schema.Types.ObjectId, ref:'User'},
  title : {
    type : String,
    required : [true, 'Title is required']
  },
  desc : {
    type : String,
    required : [true, 'Content is required']
  },
  answerId : [{type: Schema.Types.ObjectId, ref:'Answer'}],
  votes : [{
    userId : {type: Schema.Types.ObjectId, ref:'User'},
    vote : Number
  }],
  tags : [String]


},{
  timestamps : true
})

const Question = mongoose.model('Question',questions)
module.exports = Question
