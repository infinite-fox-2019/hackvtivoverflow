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
  update: (req, res, next) => {
    const { title, description } = req.body
    const { id } = req.params
    Question.findByIdAndUpdate(id, { title, description }, { omitUndefined: true })
    .then(question => {
      res.status(200).json(question)
    })
    .catch(next)
  },
  delete: (req, res, next) => {
    const { id } = req.params
    Question.findByIdAndDelete(id)
    .then(question => {
      res.status(200).json(question)
    })
    .catch(next)
  },
  findAll: (req, res, next) => {
    let objFind = {}
    if(req.query.userId) {
      objFind = {
        user: req.query.userId
      }
    }
    Question.find(objFind).populate('user').populate('answers').sort([['created_at', -1]])
    .then(questions => {
      res.status(200).json(questions)
    })
    .catch(next)
  },
  findById: (req, res, next) => {
    const { id } = req.params
    Question.findById(id).populate('user').populate({
      path: 'answers',
      populate: {
        path: 'user'
      }
    })
    .then(question => {
      if(!question) {
        throw {status: 400, msg: 'Question data not found'}
      }
      res.status(200).json(question)
    })
    .catch(next)
  },
  upvote: (req, res, next) => {
    // console.log('masuk upvote')
    const { id } = req.params
    // console.log(id)
    Question.findById(id).populate('user')
    .then(question => {
      // console.log(question)
      if(!question) {
        throw {status: 400, msg: 'Question data not found'}
      }
      let userId = req.loggedUser._id
      let upvotes = question.upvotes
      let downvotes = question.downvotes
      console.log(userId)
      if(!upvotes.includes(userId)) {
        upvotes.push(userId)
        downvotes.splice(downvotes.indexOf(userId), 1)
      } else {
        upvotes.splice(upvotes.indexOf(userId), 1)
      }
      question.save()
      res.status(200).json(question) 
    })
    .catch(next)
  },
  downvote: (req, res, next) => {
    const { id } = req.params
    Question.findById(id).populate('user')
    .then(question => {
      if(!question) {
        throw {status: 400, msg: 'Question data not found'}
      }
      let userId = String(req.loggedUser._id)
      let upvotes = question.upvotes
      let downvotes = question.downvotes
      if(!downvotes.includes(userId)) {
        downvotes.push(userId)
        upvotes.splice(upvotes.indexOf(userId), 1)
      } else {
        downvotes.splice(upvotes.indexOf(userId), 1)
      }
      question.save()
      res.status(200).json(question)
    })
    .catch(next)
  }
}