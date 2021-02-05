const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {

  static createA(req, res, next) {
    const { description } = req.body
    const _id = req.params.questionId
    const user = req.loggedUser._id
    let questionData

    Question
      .findOne({ _id })
      .populate('answers')
      .then(q => {
        questionData = q

        return Answer.create({
          description, user, question: questionData._id
        })
      })
      .then(a => {
        questionData.answers.push(a._id)
        return Question.findOneAndUpdate({ _id }, { answers: questionData.answers }, { new: true }).populate('answers').populate('user')
      
      })
      .then(a => {
        res.status(201).json(a)
      })
      .catch(next)
  }

  static getAllA(req, res, next) {
    const question = req.params.questionId

    Answer
      .find({question})
      .then(a => {
        if(!a) res.status(204).json(a)
        else res.status(200).json(a)
      })
      .catch(next)
  }

  static updateDesc(req, res, next) {
    const {description} = req.body
    const _id = req.params.id

    Answer
      .findByIdAndUpdate({_id}, {description})
      .then(a => {
        return Question.findOne({
          _id: a.question
        }).populate('answers').populate('user')
      })
      .then(q => {
        res.status(200).json(q)
      })
      .catch(next)
  }

  static upvote(req, res, next) {
    const _id = req.params.id
    const user = req.loggedUser._id
    let questionId 

    Answer
      .findOneAndUpdate({ _id }, { $pull: { downvotes: user } }, { new: true })
      .then(a => {
        questionId = a.question

        if (a.upvotes) {
          if (!a.upvotes.includes(user)) {
            a.upvotes.push(user)
            return Answer.findOneAndUpdate({
              _id
            }, {
              upvotes: a.upvotes
            }, {
              new: true
            })
          } else {
            return Answer.findOneAndUpdate({
              _id
            }, { $pull: { upvotes: user } }, { new: true })
          }
        } else {
          a.upvotes.push(user)
          return Answer.findOneAndUpdate({
            _id
          }, { upvotes: a.upvotes }, { new: true })
        }
      })
      .then(_ => {
        return Question.findOne({
          _id: questionId
        }).populate({path:'answers', populate: {path: 'user'}}).populate('user')
      })
      .then(q => {
        res.status(200).json(q)
      })
      .catch(next)
  }

  static downvote(req, res, next) {
    const _id = req.params.id
    const user = req.loggedUser._id
    let questionId

    Answer
      .findOneAndUpdate({ _id }, { $pull: { upvotes: user } }, { new: true })
      .then(a => {
        questionId = a.question
        if (a.downvotes) {
          if (!a.downvotes.includes(user)) {
            a.downvotes.push(user)
            return Answer.findOneAndUpdate({
              _id
            }, {
              downvotes: a.downvotes
            }, {
              new: true
            })
          } else {
            return Answer.findOneAndUpdate({
              _id
            }, {  downvotes: a.upvotes } , { new: true })
          }
        } else {
          a.downvotes.push(user)
          return Answer.findOneAndUpdate({
            _id
          }, { downvotes: a.downvotes }, { new: true })
        }
      })
      .then(_ => {
        return Question.findOne({
          _id: questionId
        }).populate({path:'answers', populate: {path: 'user'}}).populate('user')
      })
      .then(q => {
        res.status(200).json(q)
      })
      .catch(next)
  }

  static remove(req, res, next) {
    const _id = req.params.id

    Answer
      .findOneAndDelete({_id})
      .then(a => {
        return Question.updateOne({
          _id: a.question
        }, {$pull: {answers: a._id}})
      })
      .then(_ => {
        res.status(200).json({message: 'Deleted!'})
      })
      .catch(next)
  }
}

module.exports = AnswerController