const Answer = require("../models/answer")
const Question = require("../models/question")
const User = require("../models/user")


class UserController{

    static myAnswerNQuest(req,res, next){
        User.find({_id : req.loggedUser.id}).populate('listAnswers').populate('listQuestions')
        .then(function(data){
            res.status(201).json(data)
        })
        .catch(next)
    }

    static upVote(req,res,next){
        console.log('masuk')
        let questAnsId = req.params.id
        let status
        Question.findOne({_id : questAnsId})
        .then(respond=>{
            if(respond){
                if(respond.upvotes.includes(req.loggedUser.id)){
                    console.log('cant do that')
                }else{
                    status = "question"
                    return Question.findOneAndUpdate({_id : questAnsId}, {$push : {upvotes : req.loggedUser.id}, $pull : {downvote : req.loggedUser.id}}, {new : true})
                }
            }else{
                status = "answer"
                return Answer.findOne({_id : questAnsId})
            }
        })
        .then(respond =>{
            if(status === "question"){
                res.status(200).json(respond)
            }else{
                if(respond.upvotes.includes(req.loggedUser.id)){
                    console.log('cant do that')
                }else{
                    return Answer.findOneAndUpdate({_id : questAnsId}, {$push : {upvotes : req.loggedUser.id}, $pull : {downVote : req.loggedUser.id}}, {new : true})
                }
            }
        })
        .then(answer=>{
            console.log("MASUK NIH?")
            res.status(200).json(answer)
        })
        .catch(next)
    }

    static downVote(req,res,next){
        let questAnsId = req.params.id
        let status
        Question.findOne({_id : questAnsId})
        .then(respond=>{
            if(respond){
                console.log(respond)
                if(respond.downvote.includes(req.loggedUser.id)){
                    console.log('cant do that')
                }else{
                    status = "question"
                    return Question.findOneAndUpdate({_id : questAnsId}, {$push : {downvote : req.loggedUser.id}, $pull : {upvotes : req.loggedUser.id}}, {new : true})
                }
            }else{
                status = "answer"
                return Answer.findOne({_id : questAnsId})
            }
        })
        .then(respond =>{
            if(status === "question"){
                res.status(200).json(respond)
            }else{
                if(respond.downvote.includes(req.loggedUser.id)){
                    console.log('cant do that')
                }else{
                    return Answer.findOneAndUpdate({_id : questAnsId}, {$push : {downvote : req.loggedUser.id}, $pull : {upvotes : req.loggedUser.id}}, {new : true})
                }
            }
        })
        .then(answer=>{
            res.status(200).json(answer)
        })
        .catch(next)
    }

}

module.exports = UserController