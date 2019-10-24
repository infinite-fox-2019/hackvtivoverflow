const Answer = require('../models/answer')
const ObjectId = require('mongoose').Types.ObjectId;
const Question = require('../models/question')

class AnswerController {
  static create (req, res, next) {
    const {description, questionId} = req.body
    const { id } = req.loggedUser
    Answer.create({description, userId: id, questionId})
      .then(answer=>{
        return Question.updateOne({_id: questionId}, { $push: { answers : answer._id}})
      })
      .then(response=>{
        res.status(201).json({message: 'Successfully created answer'})
      })
      .catch(next)
  }
  static findById (req, res, next) {
    const {id} = req.params
    Answer.findById(id)
      .then(answer=>{
        res.status(200).json(answer)
      })
      .catch(next)
  }
  static find (req, res, next) {
    const {questionId} = req.params
    Answer.find({questionId: ObjectId(questionId)}).populate('userId')
      .then(answers=>{
        res.status(200).json(answers)
      })
      .catch(next)
  }
  static update(req, res, next) {
    const {description} = req.body
    const { id } = req.params
    let objParams = {description}
    Answer.findByIdAndUpdate(id, objParams)
      .then(answer =>{
        res.status(200).json({message: 'Success Updated answer', answer: answer})
      })
      .catch(next)
  }
  static delete (req, res, next) {
    const {id} = req.params
    Answer.findByIdAndDelete(id)
      .then(answer=>{
        res.status(200).json({message: 'Success deleted answer', answer: answer})
      })
      .catch(next)
  }
  static upvote (req, res, next) {
    const {answerId} = req.body
    Answer.findOne({_id: ObjectId(answerId), upVotes: req.loggedUser.id})
      .then(answer => {
        if(answer) {
          return Answer.updateOne({_id: ObjectId(answerId)}, { $pull : { upVotes: req.loggedUser.id }})
        } else {
          return Answer.updateOne({_id: ObjectId(answerId) }, { $push: { upVotes: req.loggedUser.id }})
        }
      })
      .then(respnse=>{
        res.status(200).json({message: 'Successfully upvote answer'})
      })
      .catch(next)
  }
  static downvote (req, res, next) {
    const {answerId} = req.body
    Answer.findOne({_id: ObjectId(answerId), downVotes: req.loggedUser.id})
      .then(answer => {
        if(answer) {
          return Answer.updateOne({_id: ObjectId(answerId)}, { $pull : { downVotes: req.loggedUser.id }})
        } else {
          return Answer.updateOne({_id: ObjectId(answerId) }, { $push: { downVotes: req.loggedUser.id }})
        }
      })
      .then(response =>{
        res.status(200).json({message:'Successfully downvote answer'})
      })
      .catch(next)
  }
}

module.exports = AnswerController