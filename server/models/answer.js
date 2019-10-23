const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ASchema = new Schema ({
    response: { type: String, required: true },
    upvotes: [],
    downvotes: [],
    QuestionId: { type: Schema.Types.ObjectId, ref: 'questions' },
    UserId: { type: Schema.Types.ObjectId, ref: 'users' }
});

ASchema.pre('save', function(next) {
    this.upvotes = [];
    this.downvotes = [];
    next();
})

const Answer = Mongoose.model('answers', ASchema);

Answer.createCollection()
    .then(_=>{
        console.log('Answer Collection is Ready!')
    })
    .catch(err=>{
        console.log('Something Wrong!')
    })

module.exports = Answer;