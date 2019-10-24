const Question = require("../models/questions");
const Answer = require('../models/answer');
const mongoose = require('mongoose')

class QuestionController {
    static findAll (req,res,next) {
        Question.find().populate('UserId').sort([['createdAt','descending']])
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)
    }
    static findQuestionUser (req,res,next) {
        const UserId = new mongoose.Types.ObjectId(req.loggedUser.id)
        console.log(UserId)
        Question.find({ UserId }).exec()
            .then(question => {
              // console.log(question)
                res.status(200).json(question)
            })
            .catch(next);
    }
    static findOneQuestion (req,res,next) {
        const _id = req.params.id;
        Question.findById({_id}).populate('UserId')
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }
    static create (req,res,next) {
        console.log(req.body.tags)
        const UserId = req.loggedUser.id
        const { title, description, tags } = req.body;
        Question.create({ title, description, UserId, tags })
            .then(data => {
                res.status(201).json({ msg: 'Question Created!', question: data });
            })
            .catch(next);
    }
    static findByTag (req,res,next) {
        const tag = req.params.name;
        Question.find().populate('UserId').sort([['createdAt','descending']])
            .then(questions => {
                const temp = []
                questions.forEach((el,i) => {
                    for(let i=0;i<el.tags.length;i++) {
                        if(el.tags[i] == tag){
                            temp.push(el)
                        }
                    }
                })
                res.status(200).json(temp)
            })
            .catch(next)
    }
    static searchTitle (req,res,next) {
        const title = req.params.name;
        Question.find({title: new RegExp(title, 'i')})
            .then(datas => {
                res.status(200).json(datas)
            })
            .catch(next)
    }
    static updateUpVote (req,res,next) {
        const id = req.loggedUser.id
        const _id = req.body.id
        Question.findById({_id})
            .then(question => {
                let pass = true;
                question.upvotes.forEach((el,i) => {
                    if(el == id) {
                        pass = false
                    }
                })
                if(!pass) throw { msg: 'upspam'}
                else {
                    return Question.findByIdAndUpdate({_id},{ $push: { "upvotes": id}})
                }
            })
            .then(data => {
                return Question.findById({_id})
            })
            .then(question => {
                for(let i=0; i<question.downvotes.length; i++ ){
                    if(question.downvotes[i] == id) {
                        question.downvotes.splice(i, 1)
                    }
                }
                return Question.findByIdAndUpdate({_id},{downvotes: question.downvotes})
            })
            .then(success => {
                res.status(201).json(success)
            })
            .catch(next)
    }
    static updateDownVote (req,res,next) {
        const id = req.loggedUser.id
        const _id = req.body.id
        Question.findById({_id})
            .then(question => {
                let pass = true;
                question.downvotes.forEach((el,i) => {
                    if(el == id) {
                        pass = false;
                    }
                })
                if(!pass) throw {msg: 'downspam'}
                else {
                    return Question.findByIdAndUpdate({_id},{$push: { "downvotes": id}})
                }
            })
            .then(data => {
                return Question.findById({_id})
            })
            .then(question => {
                for(let i=0; i<question.upvotes.length; i++) {
                    if(question.upvotes[i] == id) {
                        question.upvotes.splice(i,1)
                    }
                }
                return Question.findByIdAndUpdate({_id},{upvotes: question.upvotes})
            })
            .then(success => {
                res.status(201).json(success)
            })
            .catch(next)
    }
    static deleteQuestion (req,res,next) {
      const _id = new mongoose.Types.ObjectId(req.params.id)
      Question.findByIdAndDelete({_id})
        .then(success => {
          return Answer.find({QuestionId: _id})
        })
        .then(answers => {
          console.log(answers)
          return Answer.deleteMany({ QuestionId: _id})
        })
        .then(_ => {
          res.status(200).json({msg: "success delete all"})
        })
        .catch(next)
    }
    static updateQuestion (req,res,next) {
      console.log(req.params.id)
      const _id = req.params.id
      Question.findByIdAndUpdate({_id},{title: req.body.title, description: req.body.description})
        .then(_ => {
          res.status(201).json({msg: 'success update'})
        })
        .catch(next)
    }
}

module.exports = QuestionController;