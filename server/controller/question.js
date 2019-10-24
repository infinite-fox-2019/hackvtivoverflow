const Question = require('../models/question')

class QuestionController{
  static addQuestion(req, res, next) {
    let userId = req.logedUser
    let { title, description } = req.body
    let tag = req.body.tag.split(' ')
    Question.create({
      userId : userId._id, title, description, tag
    })
      .then(question => {
        res.status(201).json(question)
      })
      .catch(next)
  }

  static getAll(req, res, next) {
    Question.find()
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    let { questionId } = req.params
    Question.findOne({ _id: questionId })
      .then(question => {
        res.status(200).json(question)
      })
      .catch(next)
  }

  static upVote(req, res, next) {
    let userId = req.logedUser
    let { questionId } = req.params
    Question.findById(questionId)
      .then(question => {
        let upVote = question.upVote
        let downVote = question.downVote
        let value = question.value

        downVote.forEach((el, i) => {
          if (el._id == userId._id) {
            downVote.splice(i, 1)
          }
        })

        if (upVote.length == 0) {
          upVote.push(userId)
          value += 1
          Question.updateOne({ _id: questionId }, { $set: { upVote, value } })
            .then(() => {
              res.status(200).json({msg: "Successed vote"})
          })
        } else {
          upVote.forEach((el, index) => {
            if (el._id == userId._id) {
              upVote.splice(index, 1)
              value -= 1
              Question.updateOne({ _id: questionId }, { $set: { upVote, value } })
                .then(() => { 
                  res.status(200).json({ msg: "Canceled vote" })
                })
            } else {
              upVote.push(userId)
              value += 1
              Question.updateOne({ _id: questionId }, { $set: { upVote, value } })
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
    let { questionId } = req.params
    Question.findById(questionId)
      .then(question => {
        let upVote = question.upVote
        let downVote = question.downVote
        let value = question.value

        upVote.forEach((el, i) => {
          if (el._id == userId._id) {
            upVote.splice(i, 1)
          }
        })

        if (downVote.length == 0) {
          downVote.push(userId)
          value -= 1
          Question.updateOne({ _id: questionId }, { $set: { downVote, value } })
            .then(() => {
              res.status(200).json({ msg: "Successed downVote" })
            })
        } else {
          downVote.forEach((el, index) => {
            if (el._id == userId._id) {
              downVote.splice(index, 1)
              value += 1
              Question.updateOne({ _id: questionId }, { $set: { downVote, value } })
                .then(() => {
                  res.status(200).json({ msg: "Canceled downVote" })
                })
            } else {
              downVote.push(userId)
              value -= 1
              Question.updateOne({ _id: questionId }, { $set: { downVote, value } })
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

module.exports = QuestionController