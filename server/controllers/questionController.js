const Question = require("../models/question")
const User = require("../models/user")
const Answer = require("../models/answer")

class QuestionController{
    static getQuest (req, res, next){
        Question.find().populate('questionAnswers').populate('UserId')
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)

        // User.findOne({_id : req.loggedUser.id}).populate('listQuestions')
        // .then(data =>{
        //     res.status(200).json(data)
        // })
        // .catch(next)
    }

    static getDetail (req, res, next){
        let questId = req.params.id
        Question.findOne({_id : questId}).populate('UserId').populate({ 
            path: 'questionAnswers',
            populate: {
              path: 'UserId'
            } 
         })
        .then(data =>{
            console.log(data)
            res.status(200).json(data)
        })
        .catch(next)

    }


    static makeQuest (req,res, next){
        const {title, description} = req.body
        let newQuest
        Question.create({title, description, UserId : req.loggedUser.id})
        .then(data =>{
            newQuest = data
            // console.log(data, req.loggedUser.id)
            return User.findOneAndUpdate({_id : req.loggedUser.id}, {$push : {listQuestions : data._id}}, {new : true})
        })
        .then(function(data){
            res.status(201).json(newQuest)
        })
        .catch(next)
    }

    static updateQuest (req,res,next){
        let questId = req.params.id
        const {title, description} = req.body
        Question.findOneAndUpdate({_id : questId},  {title, description}, {new : true})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static deleteQuest(req, res, next){
        let questId = req.params.id
        let answerArrId

        Question.findOne({_id : questId})
        .then(data =>{
            answerArrId = data.questionAnswers
            return User.findOneAndUpdate({_id : req.loggedUser.id}, {$pull : {listQuestions : questId}}, {new : true})
        })
        .then( data =>{
            console.log(data)
           return Answer.deleteMany({_id : { $in : answerArrId}})
        })
        .then( data=>{
            console.log(data)
           return Question.findOneAndDelete({_id : questId})
        })
       .then(data =>{
           res.status(200).json(data)
       })
       .catch(next)
        
    }
    
}

module.exports = QuestionController