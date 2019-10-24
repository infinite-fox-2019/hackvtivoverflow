const Answer = require('../models/answer')

class AnswerController {
    static create(req, res, next){
        let {description} = req.body
        let {questionId} = req.params
        Answer.create({
            description,
            questionId,
            userId: req.loggedUser._id
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }
    static readByQuestionId(req, res, next){
        let {questionId} = req.params
        Answer.find({questionId})
            .populate('userId')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static upVote(req, res, next){
        let {id} = req.params
        Answer.findOne({_id:id})
            .then(data => {
                let downArr = data.downvotes
                let upArr = data.upvotes
                if(data.userId == req.loggedUser._id){
                    throw {
                        msg: 'Cannot Upvote Your Own Answer',
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
                return Answer.updateOne({_id:id}, {
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
        Answer.findOne({_id:id})
            .then(data => {
                let upArr = data.upvotes
                let downArr = data.downvotes
                if(data.userId == req.loggedUser._id){
                    throw {
                        msg: 'Cannot Downvote Your Own Answer',
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
                return Answer.updateOne({_id:id}, {
                    upvotes: upArr,
                    downvotes: downArr
                })
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static update(req, res, next){
        let {description} = req.body
        let {id} = req.params
        Answer.updateOne({_id:id},
            {
                description
            }
        )
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = AnswerController