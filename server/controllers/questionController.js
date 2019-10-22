const Question = require('../models/question')

class QuestionController {
  static create (req, res, next) {
    const { title, description, tags} = req.body
    const { id } = req.loggedUser
    Question.create({title, description, tags, userId: id})
      .then(question=>{
        res.status(201).json(question)
      })
      .catch(next)
  }
  static find (req, res, next) {
    let { keyword } = req.query;
    let objParams;
    if (keyword) {

        objParams = { $or: [
                { title: { $regex: `${keyword}`, $options: 'i' } },
                { description: { $regex: `${keyword}`, $options: 'i' } },
                { tags: { $in: [`${keyword}`] } }
            ]
        }
    }
    Question.find(objParams)
      .then(questions=>{
        res.status(200).json(questions)
      })
      .catch(next)
  }
  static findByUser (req, res, next) {
    const {id} = req.params
    Question.findById(id)
      .then(question=>{
        res.status(200).json(question)
      })
      .catch(next)
  }
  static update(req, res, next) {
    const { id } = req.params
    const {description, votes} = req.body
    let objParams = {}
    if(description) objParams.description = description
    if(votes) objParams.votes = votes
    Question.findByIdAndUpdate(id, objParams)
      .then(question=>{
        res.status(200).json({message: 'Successfully updated question', question})
      })
      .catch(next)
  }
  static delete (req, res, next) {
    const {id} = req.params
    Question.findByIdAndDelete(id)
      .then(question=>{
        res.status(200).json({message: 'Successfully deleted question', question})
      })
      .catch(next)
  }
}

module.exports = QuestionController