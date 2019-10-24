const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
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
  author_post: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  comments_post: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Comment' 
  }],
  views: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post