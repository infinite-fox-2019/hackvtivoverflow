const Question = require('../models/question')
const ObjectId = require('mongoose').Types.ObjectId

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
    console.log(id, '=======================================');
    Question.findOne({_id: id})
      .then(question=>{
        res.status(200).json(question)
      })
      .catch(next)
  }
  static update(req, res, next) {
    const { id } = req.params
    const {description, tags} = req.body
    let objParams = {}
    if(description) objParams.description = description
    if(tags) objParams.tags = tags
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
  static upvote (req, res, next) {
    const { questionId } = req.body
    Question.findOne({_id: ObjectId(questionId), upVotes : req.loggedUser.id})
      .then(question=>{
        if(question){
          return Question.update({_id: ObjectId(questionId)}, { $pull : { upVotes: req.loggedUser.id } })
        } else {
          return Question.update({_id: ObjectId(questionId)}, { $push: { upVotes : req.loggedUser.id } })
        }
      })
      .then(response=>{
        res.status(200).json({ message: 'Successfully upvote'})
      })
      .catch(next)
  } 
  static downvote (req, res, next) {
    const { questionId } = req.body
    Question.findOne({_id: ObjectId(questionId), downVotes : req.loggedUser.id})
      .then(question=>{
        if(question){
          return Question.update({_id: ObjectId(questionId)}, { $pull : { downVotes: req.loggedUser.id } })
        } else {
          return Question.update({_id: ObjectId(questionId)}, { $push: { downVotes: req.loggedUser.id } })
        }
      })
      .then(response=>{
        res.status(200).json({ message: 'Successfully downvote'})
      })
      .catch(next)
  } 
}

module.exports = QuestionController