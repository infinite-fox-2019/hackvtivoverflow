const Question = require('../models/question')
const { verifyToken } = require('../helpers/jwt')
const User = require ('../models/user')

class QuestionController {

  static readAll (req,res,next) {
    Question.find({})
      .then(function (questions) {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static create (req,res,next) {
    Question.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.decoded.id
    })
    .then(function (newQuestion) {
      return User.findByIdAndUpdate(req.decoded.id, {$push: {questions: newQuestion}},{new: true})
    })
    .then(function (user) {
      res.status(201).json(user)
    })
    .catch(next)
  }

  static update (req,res,next) {
    const id = req.params.id
    const { title, description } = req.body
    const userId = req.decoded.id
    Question.updateOne(id, {
      title: title,
      description: description,
      userId: userId
    })
    .then(function (question) {
      res.status(202).json(question)
    })
    .catch(next)
  }

  static delete (req,res,next) {
    const id = req.params.id
    const userId = req.decoded.id
    User.findByIdAndUpdate(userId, {$pull: {questions: id}})
      .then(function(user) {
        return Question.findOneAndDelete({_id: id})
      })
      .then(function(question) {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static upvote (req,res,next) {
    const id = req.params.id
    Question.findByIdAndUpdate(id,{$pull:{downvotes: req.decoded.id}})
      .then(function (question) {
        return Question.findByIdAndUpdate(id, {$push: {upvotes: req.decoded.id}})
      })
      .then(function (upvote) {
        res.status(200).json({
          message: 'You Upvote this question'
        })
      })
      .catch(next)
  }

  static downvote (req,res,next) {
    const id = req.params.id
    Question.findByIdAndUpdate(id, {$pull: {upvotes: req.decoded.id}})
      .then(function(vote) {
        return Question.findByIdAndUpdate(id, {$push: {downvotes: req.decoded.id}})
      })
      .then(function(downvote) {
        res.status(200).json({
          message: 'You Downvote this Question'
        })
      })
      .catch(next)
  }

};

module.exports = QuestionController

