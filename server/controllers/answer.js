'use strict'

const { Question, Vote } = require('../models')

class AnswerController {
  static upVote (req, res, next) {
    const userId = req.decode.id
    const questionId = req.params.id
    Question.findOne({ _id: questionId, upVote: userId })
      .then(upVoted => {
        if (upVoted) { throw new Error({ status: 400, message: 'You already upVote!' }) } else { return Question.findOne({ _id: questionId, downVote: userId }) }
      })
      .then(downVotedQuestion => {
        if (downVotedQuestion) {
          return Question.findOneAndUpdate(
            { _id: questionId },
            { $pull: { downVote: userId } },
            { new: true }
          )
        } else {
          return Question.findOneAndUpdate(
            { _id: questionId },
            { $push: { upVote: userId } },
            { new: true }
          )
        }
      })
      .then(question => {
        res.status(200).json({ message: 'UpVote Success', question })
      })
      .catch(next)
  }
}

module.exports = AnswerController
