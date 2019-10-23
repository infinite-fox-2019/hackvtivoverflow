const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const QSchema = new Schema ({
    title: { type: String, required: true },
    description: { type: String, required: true },
    upvotes: [],
    downvotes: [],
    tags: [],
    UserId: { type: Schema.Types.ObjectId, ref: 'users' },
    createdAt: Date
})

QSchema.pre('save', function (next) {
    this.createdAt = new Date()
    this.upvotes = [];
    this.downvotes = [];
    next()
})

const Question = Mongoose.model('questions',QSchema);

Question.createCollection()
    .then(_=>{
        console.log('Question Collection Ready')
    })
    .catch(console.log);

module.exports = Question;