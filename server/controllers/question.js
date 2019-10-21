'use strict'

const { Question, Vote } = require('../models')

class QuestionController {
  static createQuestion (req, res, next) {
    const { title, description, tagUser } = req.body
    const tags = tagUser
    const UserId = req.decoded.id
    Question.create({ title, description, tags, UserId })
      .then((question) => {
        res.status(200).json(question)
      }).catch(next)
  }

  static removeQuestion (req, res, next) {
    const { id } = req.params
    Question.findByIdAndDelete(id)
      .then((result) => {
        res.status(200).json(result)
      }).catch(next)
  }

  static updateQuestion (req, res, next) {
    const { id } = req.params
    const { title, description, tagUser } = req.body
    console.log(tagUser)
    Question.findByIdAndUpdate(id, {
      title,
      description,
      tags: tagUser
    }, {
      new: true, omitUndefined: true
    })
      // Nyalakan kembali kalau update tagUser nya gagal
      // .then(result => {
      //   return Question.findByIdAndUpdate(id, {
      //     $addToSet: {
      //       tags: {
      //         $each: tagUser
      //       }
      //     }
      //   }, {
      //     new: true,
      //     runValidators: true
      //   })
      .then(data => {
        res.status(200).json(data)
      })
      // })
      .catch(next)
  }

  static getQuestions (req, res, next) {
    Question.find().populate('UserId').sort({ createdAt: -1 })
      .then((questions) => {
        res.status(200).json(questions)
      }).catch(next)
  }

  static getUserQuestion (req, res, next) {
    const { id } = req.decoded
    Question.find({ UserId: id }).sort({ createdAt: -1 }).populate('UserId')
      .then((userQuestions) => {
        res.status(200).json(userQuestions)
      }).catch(next)
  }

  static getOneQuestion (req, res, next) {
    const { id } = req.params
    Question.findById(id).populate({
      path: 'answers',
      populate: {
        path: 'UserId'
      },
      options: {
        sort: {
          createdAt: -1
        }
      }
    })
      .then((question) => {
        res.status(200).json(question)
      }).catch(next)
  }

  static upvote (req, res, next) {
    const UserId = req.decoded.id
    const questionId = req.params.id
    Question.findOne({
      _id: questionId,
      upvotes: UserId
    })
      .then((upvoted) => {
        if (upvoted) {
          throw new Error({ status: 400, message: 'You already upvoted this question!' })
        } else {
          return Question.findOne({
            _id: questionId,
            downvotes: UserId
          })
        }
      })
      .then(downvotedQuestion => {
        if (downvotedQuestion) {
          return Question.findByIdAndUpdate(questionId, {
            $pull: {
              downvotes: UserId
            }
          }, { new: true })
        } else {
          return Question.findByIdAndUpdate(questionId, {
            $push: {
              upvotes: UserId
            }
          }, { new: true })
        }
      })
      .then(results => {
        res.status(200).json(results)
      })
      .catch(next)
  }

  static downvote (req, res, next) {
    const UserId = req.decoded.id
    const questionId = req.params.id
    Question.findOne({
      _id: questionId,
      downvotes: UserId
    })
      .then((downvoted) => {
        if (downvoted) {
          throw new Error({ status: 400, message: 'You already downvoted this question!' })
        } else {
          return Question.findOne({
            _id: questionId,
            upvotes: UserId
          })
        }
      })
      .then(upvotedQuestion => {
        if (upvotedQuestion) {
          return Question.findByIdAndUpdate(questionId, {
            $pull: {
              upvotes: UserId
            }
          }, { new: true })
        } else {
          return Question.findByIdAndUpdate(questionId, {
            $push: {
              downvotes: UserId
            }
          }, { new: true })
        }
      })
      .then(results => {
        res.status(200).json(results)
      })
      .catch(next)
  }

  static createTags (req, res, next) {
    const { id, tagUser } = req.body
    Question.findByIdAndUpdate(id, {
      $set: {
        tags: []
      }
    }, {
      new: true,
      runValidators: true
    })
      .then((result) => {
        return Question.findByIdAndUpdate(id, {
          $addToSet: {
            tags: {
              $each: tagUser
            }
          }
        }, { new: true, runValidators: true })
      }).catch(next)
  }

  static getTagsByName (req, res, next) {
    const myTag = req.params.tag
    Question.find().populate('UserId')
      .then((result) => {
        const filtered = result.filter(el => {
          return el.tags.includes(myTag)
        })
        res.status(200).json(filtered)
      }).catch(next)
  }

  static changeTopThree (req, res, next) {
    Question.find().populate('UserId')
      .then((result) => {
        const top3 = []
        for (let i = 0; i < result.length; i++) {
          const topResult = {}
          topResult.question = result[i]
        }
      }).catch((err) => {

      })
  }
}

module.exports = QuestionController
