const Answer = require("../models/answer")
const Question = require("../models/question")
const User = require("../models/user")

class AnswerController{
    // static getAns (req, res, next){
    //     User.findOne({_id : req.loggedUser.id}).populate('listAnswers')
    //     .then(data => {
    //         res.status(200).json(data)
    //     })
    //     .catch(next)
    // }
    static makeAns (req,res, next){
        const questionId = req.params.id
        const {title, description} = req.body
        let answerId
        let answer
        Answer.create({title, description, UserId : req.loggedUser.id, QuestionId : req.params.id})
        .then(data =>{
            answer = data
            answerId = data._id
            return User.findOneAndUpdate({_id : req.loggedUser.id}, {$push : {listAnswers : data._id}}, {new : true})
        })
        .then(_ =>{
            return Question.findOneAndUpdate({_id : questionId}, {$push : {questionAnswers : answerId}}, {new : true})
            
        })
        .then(data=>{
            res.status(201).json(answer)
        })
        .catch(next)
    }

    static updateAnswer(req, res, next){
        let answerId = req.params.id
        const {title, description} = req.body
        Answer.findOneAndUpdate({_id : answerId},  {title, description}, {new : true})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static deleteAnswer(req, res, next){
        let answerId = req.params.id
        let questId
        Answer.findOne({_id : answerId})
        .then(data=>{
            questId = data.QuestionId
            return User.findOneAndUpdate({_id : req.loggedUser.id}, {$pull : {listAnswers : answerId}}, {new : true})
        })
        .then(_=>{
           return Question.findOneAndUpdate({_id : questId}, {$pull : {questionAnswers : answerId}}, {new : true})
        })
        .then(_=>{
           return Answer.findOneAndDelete({_id : answerId})
        })
       .then(data =>{
           res.status(200).json(data)
       })
       .catch(next)
        
    }
}

module.exports = AnswerController