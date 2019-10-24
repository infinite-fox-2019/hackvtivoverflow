const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    downvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Answer"
      }
    ],
    tags: {
      type: []
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
