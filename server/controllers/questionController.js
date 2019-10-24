const Question = require('../models/question')
const Answer = require('../models/answer')

class QuestionController {

  static questionList(req,res,next){
    Question.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static questionDetail(req,res,next){
    const {_id} = req.params //Id question, for question page
    Question.findOne({_id})
    .populate('AnswerId')
    .populate('UserId')
    .populate({path:'AnswerId', populate:{path:'UserId'}})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static editQuestion(req,res,next){
    const {_id} = req.params //question id
    Question.updateOne({_id},{description})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static updateUpvotes(req,res,next){
    const {_id} = req.params // Need a question id for update upvotes
    const UserId = req.loggedUser._id
    Question.findOne({_id})
      .then(data => {
        if(data){
          for(let i = 0; i < data.upvotes.length; i++){
            if(data.upvotes[i] == UserId){
              // return res.status(400).json({msg:"You have upvotes this before"})
              return Question.updateOne({_id},{$pull:{upvotes:UserId}})
            }
          }
          for(let i = 0; i < data.downvotes.length; i++){
            if(data.downvotes[i] == UserId){
              return Promise.all([
                Question.updateOne({_id},{$pull:{downvotes:UserId}}),
                Question.updateOne({_id},{$push:{upvotes:UserId}})
              ])
            }
          }
          return Question.updateOne({_id},{$push:{upvotes:UserId}})
        }
        else{
          return res.status(404).json({msg:"Question not found"})
        }
      })
      .then(data => {
        res.status(200).json({data})
      })
      .catch(next)
  }

  static updateDownvotes(req,res,next){
    const {_id} = req.params // Need a question id for update upvotes
    const UserId = req.loggedUser._id
    Question.findOne({_id})
      .then(data => {
        if(data){
          for(let i = 0; i < data.downvotes.length; i++){
            if(data.downvotes[i] == UserId){
              return Question.updateOne({_id},{$pull:{downvotes:UserId}})
            }
          }
          for(let i = 0; i < data.upvotes.length; i++){
            if(data.upvotes[i] == UserId){
              console.log("masuk")
              return Promise.all([
                Question.updateOne({_id},{$pull:{upvotes:UserId}}),
                Question.updateOne({_id},{$push:{downvotes:UserId}})
              ])
            }
          }
          return Question.updateOne({_id},{$push:{downvotes:UserId}})

        }
        else{
          return res.status(404).json({msg:"Question not found"})
        }
      })
      .then(data => {
        res.status(200).json({data})
      })
      .catch(next)
  }

  static createQuestion(req,res,next){
    const {_id} = req.loggedUser
    const {title,description} = req.body
    Question.create({title,description,UserId:_id})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static deleteQuestion(req,res,next){
    const {_id} = req.params //question id
    Question.deleteOne({_id})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = QuestionController