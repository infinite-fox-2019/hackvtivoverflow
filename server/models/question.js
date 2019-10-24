const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Tag = require('./tag')

const questionSchema = new Schema(
  {
    title: { 
      type: String,
      required : [true ,'Title is required']
     },
    description: { 
      type: String,
      required : [true, 'Description is required'] 
    },
    user: { 
      type: Schema.Types.ObjectId,
      ref: "User",
      required : [true, "User is required"]
  },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    dislikes: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    tags : [{
      type: String
    }],
  },
  {
    timestamps: true,
    versionKey: false
  }
)

questionSchema.statics.netralize = function (input) {
return this.model('Question').updateOne(
  {
    _id: input._id
  },
  {
    $pull: { dislikes: input.user , likes: input.user } 
  })
}

questionSchema.pre('save', function(next){
  let id = this._id.toString()
  Tag.updateMany({questions : {$all: [id]}}, {$pull: {questions: id}})
  .then(()=>{
    Tag.updateMany({name : {$in: this.tags}}, {$push : {questions : id}})
    .then(()=>{
      console.log('presave done')
      next()
    })
  })
})

// questionSchema.pre('updateOne', function(next){
//   let _id = this.getQuery()._id
//   let id = _id.toString()
//   let tags = this.getUpdate().tags
//   Tag.updateMany({questions : {$all: [_id]}}, {$pull: {questions: id}})
//   .then(()=>{
//     Tag.updateMany({name : {$in: tags}}, {$push : {questions : id}})
//     .then(()=>{
//       console.log('preUpdateOne')
//       next()
//     })
//   })
// })

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
