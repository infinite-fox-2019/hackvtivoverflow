'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  UserId: { type: Schema.Types.ObjectId, ref: 'User' },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true,
  versionKey: false
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer
