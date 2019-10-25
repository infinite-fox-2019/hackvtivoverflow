const mongoose = require('mongoose')
const { Schema, model } = mongoose

const questionSchema = new Schema({
  title: {type: String, required: true},
  description : {type: String, required: true},
  upVotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  downVotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  tags: []
}, {timestamps: true, versionKey: false})

const Question = model('Question ', questionSchema)

module.exports = Question