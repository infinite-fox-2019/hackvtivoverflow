const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const QSchema = new Schema ({
  title: { type: String, required: [true, 'title is required'] },
  description: { type: String, required: [true, 'description is required'] },
  upvotes: [],
  downvotes: [],
  tags: [],
  UserId: { type: Schema.Types.ObjectId, ref: 'users' },
  views: Number
}, {timestamps: true})

QSchema.pre('save', function (next) {
  this.upvotes = [];
  this.views = 0;
  this.downvotes = [];
  next()
})

const Question = Mongoose.model('questions',QSchema);


module.exports = Question;