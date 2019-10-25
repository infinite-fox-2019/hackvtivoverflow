const Question = require('../models/question')

class QuestionController {
  static create (req, res, next) {
    const { title, desc } = req.body
    Question
      .create({
        title,
        desc,
        owner: req.loggedUser.id
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static find (req, res, next) {
    Question
      .find()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static findQuestionId (req, res, next) {
    Question
      .findOne({
        _id: req.params.id
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static findMyQuestion (req, res, next) {
    Question
      .find({
        owner: req.loggedUser.id
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static updateQuestion (req, res, next) {
    const { title, desc } = req.body
    Question
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
    Question
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
        return Question
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
    Question
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
        return Question
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
  static deleteQuestion (req, res, next) {
    Question
      .deleteOne({
        _id: req.params.id
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = QuestionController