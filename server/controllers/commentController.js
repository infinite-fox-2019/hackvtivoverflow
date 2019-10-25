const Comment = require('../models/Comment')
const Post = require('../models/Post')
const User = require('../models/User')

class CommentController{
  static addComment(req, res, next){
    const {description, post_comment} = req.body
    const decode = req.loggedUser
    const author_comment = decode._id
    let comment_id = ''
    Comment.create({
      description,
      post_comment,
      author_comment
    })
      .then(comment=>{
        comment_id = comment._id
        return Post.updateOne({_id: post_comment}, {$push: { comments_post: comment._id }})
      })
      .then(num=>{
        return User.update({_id: author_comment}, {$push: { comments: comment_id}})
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static addUpVote(req, res, next){
    const _id = req.params.id
    const decode = req.loggedUser
    const author_comment = decode._id
    Comment.findOne({_id, upVotes: author_comment})
      .then(comment=>{
        if(comment){
          return comment
        }
        else{
          return Comment.update({_id}, {$push: {upVotes: author_comment}})
        }
      })
      .then(num=>{
        return Comment.update({_id}, {$pull: {downVotes: author_comment}})
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static removeUpVote(req, res, next){
    const _id = req.params.id
    const decode = req.loggedUser
    const author_comment = decode._id
    Comment.findOne({_id, upVotes: author_comment})
      .then(comment=>{
        if(!comment){
          return comment
        }
        else{
          return Comment.update({_id}, {$pull: {upVotes: author_comment}})
        }
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static addDownVote(req, res, next){
    const _id = req.params.id
    const decode = req.loggedUser
    const author_comment = decode._id
    Comment.findOne({_id, downVotes: author_comment})
      .then(comment=>{
        if(comment){
          return comment
        }
        else{
          return Comment.update({_id}, {$push: {downVotes: author_comment}})
        }
      })
      .then(num=>{
        return Comment.update({_id}, {$pull: {upVotes: author_comment}})
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static removeDownVote(req, res, next){
    const _id = req.params.id
    const decode = req.loggedUser
    const author_comment = decode._id
    Comment.findOne({_id, downVotes: author_comment})
      .then(comment=>{
        if(!comment){
          return comment
        }
        else{
          return Comment.update({_id}, {$pull: {downVotes: author_comment}})
        }
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static editComment(req, res, next){
    const {id, description} = req.body
    Comment.updateOne({_id: id}, {
      description
    })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static deleteComment(req, res, next){
    const _id = req.body.id
    console.log(_id);
    Comment.deleteOne({_id})
      .then(num=>{
        return Post.updateOne({$pull: {comments_post: _id}})
      })
      .then(num=>{
        return User.updateOne({$pull: {comments: _id}})
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

}

module.exports = CommentController