const Post = require ('../models/post')

class PostController {
  static create (req, res, next){
    const { title, description } = req.body
     Post.create({
        title, description, user: req.user.id, vote:[]
     })
     .then( created => {
        res.status(201).json(created)
     })
     .catch( next )
  }

  static findAll(req, res, next){
    Post.find({})
      .populate('User')
      .then( data => {
        res.status(200).json(data)
      })
      .catch( next )
  }

  static findOne(req, res, next){
    const id = req.params.id
    Post.findById({id})
      .populate('User')
      .then( data => {
        res.status(200).json(data)
      })
      .catch( next )
  }

  static delete(req, res, next){
    const id = req.params.id
    Post.findByIdAndRemove({id})
      .then( data => {
        res.status(200).json(data)
      })
      .catch( next )
  }
}

module.exports = PostController