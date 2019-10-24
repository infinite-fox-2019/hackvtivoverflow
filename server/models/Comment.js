const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  description:  {
    type: String,
    required: true
  },
  upVotes: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  downVotes: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  author_comment: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  post_comment: { 
    type: Schema.Types.ObjectId, 
    ref: 'Post' 
  }
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment