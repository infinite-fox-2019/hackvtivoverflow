const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voteSchema = new Schema({
  topvotes: [],
  name: String
}, {
  timestamps: true,
  versionKey: false
})

const Vote = mongoose.model('Vote', voteSchema)

module.exports = Vote
