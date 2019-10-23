const Answer = require('../models/Answer')
const Question = require('../models/Question')

module.exports = {
  add: (req, res, next) => {
    let theAnswer
    const { title, description, questionId } = req.body
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
  }
}