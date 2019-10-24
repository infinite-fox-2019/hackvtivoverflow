const Question = require('../models/Question')

class QuestionController {
    static read(req,res,next) {
        Question.find()
        .populate('userId')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
    static create(req, res, next){
        let {title,description} = req.body
        let {_id} = req.loggedUser
        Question.create({title,description,userId:_id})
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(next)
    }
    static update(req,res,next) {
        let {title,description} = req.body
        let {id} = req.params
        Question.updateOne({_id:id},{title,description})
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(next)
    }
    static delete(req,res,next) {
        let {id} = req.params
        Question.deleteOne({_id:id})
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(next)
    }
    static upvote(req,res,next) {
        let {id} = req.params
        Question.findOne({_id:id})
        .then(result=>{
            let arrUpVotes = result.upvotes
            let arrDownVotes = result.downvotes
            if(arrUpVotes.indexOf(req.loggedUser._id) === -1) {
                arrUpVotes.push(req.loggedUser._id)
                if(arrDownVotes.indexOf(req.loggedUser._id) !== -1) {
                    arrDownVotes.splice(arrDownVotes.indexOf(req.loggedUser._id),1)
                }
            } else {
                arrUpVotes.splice(arrUpVotes.indexOf(req.loggedUser._id),1)
            }
            return Question.updateOne({_id:id},{upvotes:arrUpVotes,downvotes:arrDownVotes})
        })
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(next)
    }
    static downvote(req,res,next) {
        let {id} = req.params
        Question.findOne({_id:id})
        .then(result=>{
            let arrUpVotes = result.upvotes
            let arrDownVotes = result.downvotes
            if(arrDownVotes.indexOf(req.loggedUser._id) === -1) {
                arrDownVotes.push(req.loggedUser._id)
                if(arrUpVotes.indexOf(req.loggedUser._id) !== -1) {
                    arrUpVotes.splice(arrUpVotes.indexOf(req.loggedUser._id),1)
                }
            } else {
                arrDownVotes.splice(arrDownVotes.indexOf(req.loggedUser._id),1)
            }
            return Question.updateOne({_id:id},{upvotes:arrUpVotes,downvotes:arrDownVotes})
        })
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(next)
    }
    static readOne(req,res,next) {
        let {id} = req.params
        Question.findOne({_id:id})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)
    }
    static readPersonal(req,res,next) {
        let {_id} = req.loggedUser
        Question.find({userId:_id})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = QuestionController