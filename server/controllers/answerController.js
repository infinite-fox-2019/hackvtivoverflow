const Answer = require('../models/answer')
const Question = require('../models/question')
class AnswerController {

  static readAll (req,res,next) {
    Answer.find({})
      .then(function(answers) {
        res.status(200).json(answers)
      })
      .catch(next)
  }

  static create (req,res,next) {
    const id = req.params.id
    const userId = req.decoded.id
    Answer.create({
      questionId: id,
      title: req.body.title,
      description: req.body.description,
      userId: userId
    })
    .then(function (answer) {
      return Question.findByIdAndUpdate(id, {$push: {answers: answer}}, {new: true})
    })
    .then(function(question) {
      res.status(201).json(question)
    })
    .catch(next)
  }

  static update (req,res,next) {
    const id = req.params.id
    
    Answer.updateOne({id}, {
      title: req.body.title,
      description: req.body.description
    })
    .then(function (updateAnswer) {
      res.status(202).json(updateAnswer)
    })
    .create(next)
  }

  static delete (req,res,next) {
    const id = req.params.id
    Answer.deleteOne({_id: id})
      .then(function (answerDeleted) {
        res.status(202).json(answerDeleted)
      })
      .catch(next)
  }

}

module.exports = AnswerController