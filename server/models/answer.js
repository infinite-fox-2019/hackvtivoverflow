const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
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
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
