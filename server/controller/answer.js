const Answer = require('../models/answer')

class AnswerController {
  static addAnswer(req, res, next) {
    let userId = req.logedUser
    let { questionId } = req.params
    let { answer } = req.body

    Answer.create({ userId, questionId, answer })
      .then(answer => {
        res.status(200).json(answer)
      })
      .catch(next)
  }

  static getAll(req, res, next) {
    Answer.find()
      .then(answers => {
        res.status(200).json(answers)
      })
      .catch(next)
  }

  static upVote(req, res, next) {
    let userId = req.logedUser
    let { answerId } = req.params
    Answer.findById(answerId)
    .then(answer => {
        let upVote = answer.upVote
        let downVote = answer.downVote
        let value = answer.value

        downVote.forEach((el, i) => {
          if (el._id == userId._id) {
            downVote.splice(i, 1)
          }
        })

        if (upVote.length == 0) {
          upVote.push(userId)
          value += 1
          Answer.updateOne({ _id: answerId }, { $set: { upVote, value } })
            .then(() => {
              res.status(200).json({ msg: "Successed vote" })
            })
        } else {
          upVote.forEach((el, index) => {
            if (el._id == userId._id) {
              upVote.splice(index, 1)
              value -= 1
              Answer.updateOne({ _id: answerId }, { $set: { upVote, value } })
                .then(() => {
                  res.status(200).json({ msg: "Canceled vote" })
                })
            } else {
              upVote.push(userId)
              value += 1
              Answer.updateOne({ _id: answerId }, { $set: { upVote, value } })
                .then(() => {
                  res.status(200).json({ msg: "Successed vote" })
                })
            }
          })
        }
      })
      .catch(next)
  }

  static downVote(req, res, next) {
    let userId = req.logedUser
    let { answerId } = req.params
    Answer.findById(answerId)
      .then(answer => {
        let upVote = answer.upVote
        let downVote = answer.downVote
        let value = answer.value

        upVote.forEach((el, i) => {
          if (el._id == userId._id) {
            upVote.splice(i, 1)
          }
        })

        if (downVote.length == 0) {
          downVote.push(userId)
          value -= 1
          Answer.updateOne({ _id: answerId }, { $set: { downVote, value } })
            .then(() => {
              res.status(200).json({ msg: "Successed downVote" })
            })
        } else {
          downVote.forEach((el, index) => {
            if (el._id == userId._id) {
              downVote.splice(index, 1)
              value += 1
              Answer.updateOne({ _id: answerId }, { $set: { downVote, value } })
                .then(() => {
                  res.status(200).json({ msg: "Canceled downVote" })
                })
            } else {
              downVote.push(userId)
              value -= 1
              Answer.updateOne({ _id: answerId }, { $set: { downVote, value } })
                .then(() => {
                  res.status(200).json({ msg: "Successed downVote" })
                })
            }
          })
        }
      })
      .catch(next)
  }

}

module.exports = AnswerController