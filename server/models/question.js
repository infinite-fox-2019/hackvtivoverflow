const mongoose = require('mongoose')
const { Schema, model } = mongoose

const questionSchema = new Schema({
  title: {type: String, required: true},
  description : {type: String, required: true},
  votes: {type: Number, default: 0},
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  tags: []
}, {timestamps: true, versionKey: false})

const Question = model('Question ', questionSchema)

module.exports = Question