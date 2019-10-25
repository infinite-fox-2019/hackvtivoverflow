const Question = require('../models/question')

class QuestionController {
    static create(req, res, next){
        let {title, description} = req.body
        Question.create({
            title,
            description,
            userId: req.loggedUser._id
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }
    static readAll(req, res, next){
        Question.find()
            .populate('userId')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static addAnswer(req, res, next){  
        let {id} = req.params
        let {answerId} = req.body
        Question.findOne({_id:id})
            .then(data => {
                let answersId = data.answersId
                answersId.push(answerId)
                return Question.updateOne({_id:id}, {answersId})
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static upVote(req, res, next){
        let {id} = req.params
        Question.findOne({_id:id})
            .then(data => {
                let downArr = data.downvotes
                let upArr = data.upvotes
                if(data.userId == req.loggedUser._id){
                    throw {
                        msg: 'Cannot Upvote Your Own Question',
                        statusCode: 401
                    }
                }
                else if(data.upvotes.indexOf(req.loggedUser._id) == -1){
                    upArr.push(req.loggedUser._id)
                    let index = data.downvotes.indexOf(req.loggedUser._id)
                    if(index != -1){
                        downArr.splice(index, 1)
                    }
                }
                else{
                    let index = data.upvotes.indexOf(req.loggedUser._id)
                    upArr.splice(index, 1)
                }
                return Question.updateOne({_id:id}, {
                    upvotes: upArr,
                    downvotes: downArr
                })
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static downVote(req, res, next){
        let {id} = req.params
        Question.findOne({_id:id})
            .then(data => {
                let upArr = data.upvotes
                let downArr = data.downvotes
                if(data.userId == req.loggedUser._id){
                    throw {
                        msg: 'Cannot Downvote Your Own Question',
                        statusCode: 401
                    }
                }
                else if(data.downvotes.indexOf(req.loggedUser._id) == -1){
                    downArr.push(req.loggedUser._id)
                    let index = data.upvotes.indexOf(req.loggedUser._id)
                    if(index != -1){
                        upArr.splice(index, 1)
                    }
                }
                else{
                    let index = data.downvotes.indexOf(req.loggedUser._id)
                    downArr.splice(index, 1)
                }
                return Question.updateOne({_id:id}, {
                    upvotes: upArr,
                    downvotes: downArr
                })
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static view(req, res, next){
        let {id} = req.params
        Question.findOne({_id:id})
            .then(data => {
                let index = data.views.indexOf(req.loggedUser._id)
                if(index == -1 && data.userId != req.loggedUser._id){
                    let viewArr = data.views
                    viewArr.push(req.loggedUser._id)
                    return Question.updateOne({_id:id}, {
                        views: viewArr
                    })
                }
                else{
                    res.status(200).json({views:"not add"})
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static readByUserId(req, res, next){
        let {_id} = req.loggedUser
        Question.find({userId:_id})
            .populate('userId')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static readById(req, res, next){
        let {id} = req.params
        Question.findOne({_id:id})
            .populate('userId')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static update(req, res, next){
        let {title, description} = req.body
        let {id} = req.params
        Question.updateOne({_id:id},
            {
                title,
                description
            }
        )
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static delete(req, res, next){
        let {id} = req.params
        Question.deleteOne({_id:id})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = QuestionController