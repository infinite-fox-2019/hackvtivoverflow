const Answer = require('../models/answer')

class AnswerController {
  static create (req, res, next) {
    const { title, desc } = req.body
    Answer
      .create({
        title,
        desc,
        questionId: req.params.questionId,
        owner: req.loggedUser.id
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static findByQuestion (req, res, next) {
    Answer
      .find({
        questionId: req.params.questionId
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static findAnswerId (req, res, next) {
    Answer
      .findOne({
        _id: req.params.id
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static updateAnswer (req, res, next) {
    const { title, desc } = req.body
    Answer
      .updateOne({
        _id: req.params.id
      }, {
        title,
        desc
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static upVote (req, res, next) {
    Answer
      .findOne({
        _id: req.params.id
      })
      .then(result => {
        let arrUpVotes = result.upvotes
        let arrDownVotes = result.downvotes
        if (arrUpVotes.indexOf(req.loggedUser.id) === -1) {
          arrUpVotes.push(req.loggedUser.id)
          if (arrDownVotes.indexOf(req.loggedUser.id) !== -1) {
            arrDownVotes.splice(arrDownVotes.indexOf(req.loggedUser.id), 1)
          }
        } else {
          arrUpVotes.splice(arrUpVotes.indexOf(req.loggedUser.id), 1)
        }
        return Answer
          .updateOne({
            _id: req.params.id
          }, {
            upvotes: arrUpVotes,
            downvotes: arrDownVotes
          })
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static downVote (req, res, next) {
    Answer
      .findOne({
        _id: req.params.id
      })
      .then(result => {
        let arrUpVotes = result.upvotes
        let arrDownVotes = result.downvotes
        if (arrDownVotes.indexOf(req.loggedUser.id) === -1) {
          arrDownVotes.push(req.loggedUser.id)
          if (arrUpVotes.indexOf(req.loggedUser.id) !== -1) {
            arrUpVotes.splice(arrUpVotes.indexOf(req.loggedUser.id), 1)
          }
        } else {
          arrDownVotes.splice(arrDownVotes.indexOf(req.loggedUser.id), 1)
        }
        return Answer
          .updateOne({
            _id: req.params.id
          }, {
            upvotes: arrUpVotes,
            downvotes: arrDownVotes
          })
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
}

module.exports = AnswerController