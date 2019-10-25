const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')

class PostController{

  static getPost(req, res, next){
    Post.find({})
    .populate({
      path: 'comments_post',
      populate: {path: 'author_comment'}
    })
    .populate('author_post')
      .then(posts =>{
        res.status(200).json(posts)
      })
      .catch(next)
  }

  static getPostSearch(req, res, next){
    const search = req.params.search
    Post.find({title: {$regex: search}})
    .populate({
      path: 'comments_post',
      populate: {path: 'author_comment'}
    })
    .populate('author_post')
      .then(posts =>{
        res.status(200).json(posts)
      })
      .catch(next)
  }

  static getOnePost(req, res, next){
    const _id = req.params.id
    Post.findOne({_id})
    .populate('author_post')
    .populate({
      path: 'comments_post',
      populate: {path: 'author_comment'}
    })
      .then(post=>{
        res.status(200).json(post)
      })
      .catch(next)
  }

  static addPost(req, res, next){
    const {title, description} = req.body
    const decode = req.loggedUser
    const author_post = decode._id
    Post.create({title, description, author_post})
      .then(post=>{
        return User.update({_id: author_post}, {$push: {posts: post._id}})
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static addViews(req, res, next){
    const _id = req.params.id
    const decode = req.loggedUser
    const author_post = decode._id
    Post.findOne({_id, views: author_post})
      .then(post=>{
        if(post){
          return post
        }
        else{
          return Post.update({_id}, {$push: {views: author_post}})
        }
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static addUpVote(req, res, next){
    const _id = req.params.id
    const decode = req.loggedUser
    const author_post = decode._id
    Post.findOne({_id, upVotes: author_post})
      .then(post=>{
        if(post){
          return post
        }
        else{
          return Post.update({_id}, {$push: {upVotes: author_post}})
        }
      })
      .then(num=>{
        return Post.update({_id}, {$pull: {downVotes: author_post}})
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static removeUpVote(req, res, next){
    const _id = req.params.id
    const decode = req.loggedUser
    const author_post = decode._id
    Post.findOne({_id, upVotes: author_post})
      .then(post=>{
        if(!post){
          return post
        }
        else{
          return Post.update({_id}, {$pull: {upVotes: author_post}})
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
    const author_post = decode._id
    Post.findOne({_id, downVotes: author_post})
      .then(post=>{
        if(post){
          return post
        }
        else{
          return Post.update({_id}, {$push: {downVotes: author_post}})
        }
      })
      .then(num=>{
        return Post.update({_id}, {$pull: {upVotes: author_post}})
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static removeDownVote(req, res, next){
    const _id = req.params.id
    const decode = req.loggedUser
    const author_post = decode._id
    Post.findOne({_id, downVotes: author_post})
      .then(post=>{
        if(!post){
          return post
        }
        else{
          return Post.update({_id}, {$pull: {downVotes: author_post}})
        }
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static deletePost(req, res, next){
    const _id = req.body.id
    Post.deleteOne({_id})
      .then(num=>{
        return User.update({$pull: {posts: _id}})
      })
      .then(num=>{
        return Comment.deleteMany({post_comment: _id})
      })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static editPost(req, res, next){
    const {id, title, description} = req.body
    Post.updateOne({_id: id}, {
      title,
      description
    })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }
}

module.exports = PostController