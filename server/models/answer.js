var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  title:  {type : String, required: [true, "title is required"]},
  description: {type : String, required: [true, "description is required"]},
  upvotes:   [{type: Schema.Types.ObjectId, ref: 'User'}],
  downvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
  UserId : {type: Schema.Types.ObjectId, ref: 'User'},
  QuestionId : {type: Schema.Types.ObjectId, ref: 'Question'}
})

var Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer