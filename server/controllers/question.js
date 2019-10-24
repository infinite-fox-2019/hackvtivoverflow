const Question = require('../models/question')
const Answer = require('../models/answer')

class QuestionConrtoller {

  static createQ(req, res, next) {
    const { title, description } = req.body
    const user = req.loggedUser._id

    Question
      .create({ title, description, user })
      .then(q => {
        res.status(201).json(q)
      })
      .catch(next)
  }

  static getAllQ(req, res, next) {
    Question
      .find()
      .sort({ createdAt: 'desc' })
      .populate('answers')
      .populate('user')
      .then(q => {
        console.log(q)
        if (!q) res.status(204).json({ message: 'There is no question yet' })
        else res.status(200).json(q)
      })
      .catch(next)
  }

  static getOneQ(req, res, next) {
    const _id = req.params.id

    Question
      .findOne({ _id })
      .populate({
        path: 'answers',
        populate: {
          path: 'user'
        }
      })
      .populate('user')
      .then(q => {
        res.status(200).json(q)
      })
      .catch(next)
  }

  static getUserQ(req, res, next) {
    const user = req.loggedUser._id

    Question
      .find({ user })
      .sort({ updatedAt: 'desc' })
      .populate('asnwers')
      .then(q => {
        if (!q) res.status(204).json({ message: 'There is no question yet' })
        else res.status(200).json(q)
      })
      .catch(next)
  }

  static upvote(req, res, next) {
    const _id = req.params.id
    const user = req.loggedUser._id
  
    Question
      .findOneAndUpdate({ _id }, { $pull: { downvotes: user } }, { new: true })
      .then(q => {
        if (q.upvotes) {
          if (!q.upvotes.includes(user)) {
            q.upvotes.push(user)
            return Question.findOneAndUpdate({
              _id
            }, {
              upvotes: q.upvotes
            }, {
              new: true
            })
              .populate('answers')
              .populate('user')
          } else {
            return Question.findOneAndUpdate({
              _id
            }, { $pull: { upvotes: user } }, { new: true })
              .populate('answers')
              .populate('user')
          }
        } else {
          q.upvotes.push(user)
          return Question.findOneAndUpdate({
            _id
          }, { upvotes: q.upvotes }, { new: true })
            .populate('answers')
            .populate('user')

        }
      })
      .then(q => {
        res.status(200).json(q)
      })
      .catch(next)
  }

  static downvote(req, res, next) {
    const _id = req.params.id
    const user = req.loggedUser._id

    Question
      .findOneAndUpdate({ _id }, { $pull: { upvotes: user } }, { new: true })
      .then(q => {
        if (q.downvotes) {
          if (!q.downvotes.includes(user)) {
            q.downvotes.push(user)
            return Question.findOneAndUpdate({
              _id
            }, {
              downvotes: q.downvotes
            }, {
              new: true
            })
              .populate('answers')
              .populate('user')
          } else {
            return Question.findOneAndUpdate({
              _id
            }, { $pull: { downvotes: user } }, { new: true })
              .populate('answers')
              .populate('user')
          }
        } else {
          q.downvotes.push(user)
          return Question.findOneAndUpdate({
            _id
          }, { downvotes: q.downvotes }, { new: true })
            .populate('answers')
            .populate('user')

        }
      })
      .then(q => {
        res.status(200).json(q)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { title, description } = req.body
    const _id = req.params.id

    Question
      .updateOne({ _id }, { title, description })
      .then(_ => res.status(200).json({message: 'update success'}))
      .catch(next)
  }

  static remove(req, res, next) {
    const _id = req.params.id

    Question
      .findOneAndDelete({_id})
      .populate('answers')
      .then(q => {
        const promises = []
        q.answers.forEach(answer => {
          promises.push(Answer.deleteOne({_id: answer._id}))
        })

        return Promise.all(promises)
      })
      .then(_ => {
        res.status(200).json({message: 'Deleted!'})
      })
      .catch(next)
  }
}

module.exports = QuestionConrtoller