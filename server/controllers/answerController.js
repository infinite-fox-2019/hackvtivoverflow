const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {
  
  static find(req,res,next){
    const {QuestionId} = req.body // Need a question id for get question answer
    Answer.findOne({QuestionId})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static createAnswer(req,res,next){
    console.log(req.body)
    const {QuestionId, description} = req.body
    const UserId = req.loggedUser._id
    Answer.create({QuestionId,description,UserId})
      .then(data => {
        return Question.update({_id:QuestionId},{$push:{AnswerId:data._id}})
      })
      .then(data => {
        res.status(200).json({data})
      })
      .catch(next)
  }

  static deleteAnswer(req,res,next){
    const {_id} = req.params // Need a answer id for delete the answer
    Answer.deleteOne({_id})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static editAnswer(req,res,next){
    const {_id} = req.params // Need a answer id for update
    const {description} = req.body
    Answer.updateOne({_id},{description})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static updateUpvotes(req,res,next){
    const {_id} = req.params // Need a answer id for update upvotes
    const UserId = req.loggedUser._id
    Answer.findOne({_id})
      .then(data => {
        if(data){
          for(let i = 0; i < data.upvotes.length; i++){
            if(data.upvotes[i] == UserId){
              // return res.status(400).json({msg:"You have upvotes this before"})
              return Answer.updateOne({_id},{$pull:{upvotes:UserId}})
            }
          }
          for(let i = 0; i < data.downvotes.length; i++){
            if(data.downvotes[i] == UserId){
              return Promise.all([
                Answer.updateOne({_id},{$pull:{downvotes:UserId}}),
                Answer.updateOne({_id},{$push:{upvotes:UserId}})
              ])
            }
          }
          return Answer.updateOne({_id},{$push:{upvotes:UserId}})
        }
        else{
          return res.status(404).json({msg:"Answer not found"})
        }
      })
      .then(data => {
        res.status(200).json({data})
      })
      .catch(next)
  }

  static updateDownvotes(req,res,next){
    const {_id} = req.params // Need a answer id for update upvotes
    const UserId = req.loggedUser._id
    Answer.findOne({_id})
      .then(data => {
        if(data){
          for(let i = 0; i < data.downvotes.length; i++){
            if(data.downvotes[i] == UserId){
              // return res.status(400).json({msg:"You have downvotes this before"})
              return Answer.updateOne({_id},{$pull:{downvotes:UserId}})
            }
          }
          for(let i = 0; i < data.upvotes.length; i++){
            if(data.upvotes[i] == UserId){
              return Promise.all([
                Answer.updateOne({_id},{$pull:{upvotes:UserId}}),
                Answer.updateOne({_id},{$push:{downvotes:UserId}})
              ])
            }
          }
          return Answer.updateOne({_id},{$push:{downvotes:UserId}})
        }
        else{
          return res.status(404).json({msg:"Answer not found"})
        }
      })
      .then(data => {
        res.status(200).json({data})
      })
      .catch(next)
  }



}

module.exports = AnswerController