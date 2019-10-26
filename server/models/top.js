const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topSchema = new Schema(
  {
    status: {
      type: String,
    },    
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question"
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Top = mongoose.model("Top", topSchema);

module.exports = Top;
