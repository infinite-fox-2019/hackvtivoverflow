const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const answers = new Schema({
  questionId : {type: Schema.Types.ObjectId, ref:'Question'},
  userId : {type: Schema.Types.ObjectId, ref:'User'},
  desc : {
    type : String,
    required : [true, 'desc null']
  },
  votes : [{
    userId : {type: Schema.Types.ObjectId, ref:'User'},
    vote : Number
  }]
})

const Answer = mongoose.model('Answer',answers)
module.exports = Answer