const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const QSchema = new Schema ({
    title: { type: String, required: true },
    description: { type: String, required: true },
    upvotes: Number,
    downvotes: Number,
    tags: [],
    UserId: { type: Schema.Types.ObjectId, ref: 'users' }
})

QSchema.pre('save', function (next) {
    this.upvotes = 0;
    this.downvotes = 0;
    next()
})

const Question = Mongoose.model('questions',QSchema);

Question.createCollection()
    .then(_=>{
        console.log('Question Collection Ready')
    })
    .catch(console.log);

module.exports = Question;