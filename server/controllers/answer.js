const Answer = require('../models/Answer')
const Question = require('../models/Question')

module.exports = {
  add: (req, res, next) => {
    let theAnswer
    const { title, description, questionId } = req.body
    console.log(questionId)
    Answer.create({ title, description, question: questionId, user: req.loggedUser._id })
    .then(answer => {
      theAnswer = answer
      return Question.findById(questionId)
    })
    .then(question => {
      if(!question) {
        throw {status: 400, msg: 'Question data not found'}
      } else {
        question.answers.push(theAnswer._id)
        question.save()
        res.status(200).json(theAnswer)
      }
    })
    .catch(next)
  },
  update: (req, res, next) => {
    const { title, description } = req.body
    Answer.findByIdAndUpdate(req.params.id, { title, description }, { omitUndefined: true })
    .then(answer => {
      res.status(200).json(answer)
    })
    .catch(next)
  },
  upvote: (req, res, next) => {
    const { id } = req.params
    Answer.findById(id).populate('user')
    .then(answer => {
      if(!answer) {
        throw {status: 400, msg: 'Answer data not found'}
      }
      let userId = req.loggedUser._id
      let upvotes = answer.upvotes
      let downvotes = answer.downvotes
      console.log(userId)
      if(!upvotes.includes(userId)) {
        upvotes.push(userId)
        downvotes.splice(downvotes.indexOf(userId), 1)
      } else {
        upvotes.splice(upvotes.indexOf(userId), 1)
      }
      answer.save()
      res.status(200).json(answer) 
    })
    .catch(next)
  },
  downvote: (req, res, next) => {
    const { id } = req.params
    Answer.findById(id).populate('user')
    .then(answer => {
      if(!answer) {
        throw {status: 400, msg: 'Answer data not found'}
      }
      let userId = String(req.loggedUser._id)
      let upvotes = answer.upvotes
      let downvotes = answer.downvotes
      if(!downvotes.includes(userId)) {
        downvotes.push(userId)
        upvotes.splice(upvotes.indexOf(userId), 1)
      } else {
        downvotes.splice(upvotes.indexOf(userId), 1)
      }
      answer.save()
      res.status(200).json(answer)
    })
    .catch(next)
  }
}