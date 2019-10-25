const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {
    static create (req,res,next){
        Question.findById(req.query.question)
        .then(question=>{
            if(question) {
                if(question.owner.toString() === req.decode.id) {
                    next({
                        name: 'Bad Request',
                        message: 'You cannot answer your own question!'
                    }) 
                }
                Answer.create({
                    description : req.body.description,
                    owner : req.decode.id
                })
                .then((answer)=>{
                    question.answers.push(answer._id)
                    Question.update(question)
                    .then(_=>{
                        res.status(200).json({
                            message : "added answer",
                            answer
                        })
                    })
                })
            } else {
                next({
                    name: 'NotFound',
                    message: 'Question not found'
                })
            }
        })
        .catch(err=>{
            if(err.name === 'CastError'){
                next({
                    name: 'NotFound',
                    message: 'Question not found'
                })
            } else {
                next(err)
            }
        })
    }

    static read (req,res,next){
        Answer.find().then((answers)=>{
            res.status(200).json({
                answers
            })
        }).catch(next)
    }

    static update (req,res,next){
        Answer.findByIdAndUpdate(req.params.id,{
            description : req.body.description,
        },{ new : true, omitUndefined : true})
        .then((answer)=>{
            res.status(200).json({
                answer
            })
        })
        .catch(next)
    }

    static delete (req,res,next){
        Answer.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.status(200).json({
                message : "answer deleted"
            })
        }). catch(next)
    }

    static upvote (req,res,next){
        Answer.findById(req.params.id)
        .then(answer=>{
            if(answer.owner.toString() === req.decode.id) {
                next({
                    name: 'Bad Request',
                    message: 'You cannot upvote your own answer!'
                }) 
            }
            answer.downvotes.pull(req.decode.id);
            answer.upvotes.pull(req.decode.id)
            answer.upvotes.push(req.decode.id)
            Answer.update(answer).then(_=>{
                res.status(200).json({
                    upvoteTally: answer.upvotes
                })
            })
        }).catch(err=>{
            if(err.name === 'CastError'){
                next({
                    name: 'NotFound',
                    message: 'Answer not found'
                })
            } else {
                console.log(err)
                next(err)
            }
        })
    }

    static downvote (req,res,next){
        Answer.findById(req.params.id)
        .then(answer=>{
            if(answer.owner.toString() === req.decode.id) {
                next({
                    name: 'Bad Request',
                    message: 'You cannot downvote your own answer!'
                }) 
            }
            answer.downvotes.pull(req.decode.id);
            answer.upvotes.pull(req.decode.id)
            answer.downvotes.push(req.decode.id)
            Answer.update(answer).then(_=>{
                res.status(200).json({
                    downvoteTally: answer.downvotes.length
                })
            })
        }).catch(err=>{
            if(err.name === 'CastError'){
                next({
                    name: 'NotFound',
                    message: 'Answer not found'
                })
            } else {
                console.log(err)
                next(err)
            }
        })
    }

    static clearVote (req,res,next){
        Answer.findById(req.params.id)
        .then(answer=>{
            answer.downvotes.pull(req.decode.id);
            answer.upvotes.pull(req.decode.id)
            Answer.update(answer).then(_=>{
                res.status(200).json({
                    upvoteTally: answer.upvotes.length,
                    downvoteTally: answer.downvotes.length
                })
            })
        }).catch(err=>{
            if(err.name === 'CastError'){
                next({
                    name: 'NotFound',
                    message: 'Answer not found'
                })
            } else {
                console.log(err)
                next(err)
            }
        })
    }
}

module.exports = AnswerController