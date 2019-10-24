var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  title:  {type : String, required: true},
  description: {type : String, required: true},
  upvotes:   [{type: Schema.Types.ObjectId, ref: 'User'}],
  downvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
  UserId : {type: Schema.Types.ObjectId, ref: 'User'},
  questionAnswers : [{type: Schema.Types.ObjectId, ref: 'Answer'}] 
})

var Question = mongoose.model('Question', QuestionSchema)

module.exports = Question