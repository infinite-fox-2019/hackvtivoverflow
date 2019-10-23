const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    answer: {
      type: String,
      required: [true, "Answer is required"]
    },
    questionId: { 
        type: Schema.Types.ObjectId, ref: "Question",
        required: [true, "Question id is required"]
    },
    user: { 
        type: Schema.Types.ObjectId, ref: "User",
        required: [true, "User is reuired"]
    },
    likes: [{  type: Schema.Types.ObjectId,
      ref: 'User',}],
    dislikes: [{  type: Schema.Types.ObjectId,
      ref: 'User',}],
  },
 {
     timestamps: true,
     versionKey: false
 }
)

answerSchema.statics.netralize = function (input) {
  return this.model('Answer').updateOne(
    {
      _id: input._id
    },
    {
      $pull: { dislikes: input.user , likes: input.user } 
    })
  }

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
