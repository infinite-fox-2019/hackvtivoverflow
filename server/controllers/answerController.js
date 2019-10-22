const Answer = require('../models/answer')

class AnswerController {
  static create (req, res, next) {
    const {description, questionId} = req.body
    const {id} = req.loggedUser
    Answer.create({description, userId: id, questionId})
      .then(answer=>{
        res.status(201).json(answer)
      })
      .catch(next)
  }
  static find (req, res, next) {
    const {questionId} = req.body
    Answer.find({questionId})
      .then(answers=>{
        res.status(200).json(answers)
      })
      .catch(next)
  }
  static update(req, res, next) {
    const {description, votes} = req.body
    const { id } = req.params
    let objParams = {}
    if(description) objParams.description = description
    if(votes) objParams.votes = votes

    Answer.findByIdAndUpdate(id, objParams)
      .then(answer =>{
        res.status(200).json({message: 'Success Updated answer', answer: answer})
      })
      .catch(next)
  }
  static delete (req, res, next) {
    const {id} = req.params
    Answer.findByIdAndDelete(id)
      .then(answer=>{
        res.status(200).json({message: 'Success deleted answer', answer: answer})
      })
      .catch(next)
  }
}

module.exports = AnswerController