const Question = require('../models/Question')

module.exports = {
  add: (req, res, next) => {
    const { title, description } = req.body
    Question.create({ title, description, user: req.loggedUser._id })
    .then(question => {
      res.status(201).json(question)
    })
    .catch(next)
  },
  findAll: (req, res, next) => {
    Question.find().populate('user')
    .then(questions => {
      res.status(200).json(questions)
    })
    .catch(next)
  }
}