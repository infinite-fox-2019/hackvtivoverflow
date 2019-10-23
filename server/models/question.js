const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
);

questionSchema.statics.netralize = function (input) {
return this.model('Question').updateOne(
  {
    _id: input._id
  },
  {
    $pull: { dislikes: input.user , likes: input.user } 
  })
}

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
