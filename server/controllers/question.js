const Question = require('../models/question')

class QuestionController {
    static create (req,res,next){
        Question.create({
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags.split(' '),
            owner : req.decode.id
        })
        .then((question)=>{
            res.status(201).json({
                message : "added question",
                question
            })
        })
        .catch(next)
    }

    static read (req,res,next){
        Question.find().populate('answers').then((questions)=>{
            res.status(200).json({
                questions
            })
        }).catch(next)
    }

    static findByTitle (req,res,next){
        Question.find( { title : { "$regex": req.query.q, "$options": "i" }}).populate('owner')
        .then((questions)=>{
            res.status(200).json({
                questions
            })
        }).catch(next)
    }

    static findById (req,res,next){
        Question.findById(req.params.id).populate('owner')
        .then((question)=>{
            res.status(200).json({
                question
            })
        }).catch(err=>{
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

    static upvote3 (req,res,next){ 
        Question.findByIdAndUpdate(req.params.id,{$pull:{'Question.upvotes':req.decode.id}})
        .then(_=>{
            res.status(200).json({
                msg:'del'
            })
            console.log('del')
        })
        .catch(err=>{
            res.status(400).json({
                msg: err
            })
        })
    }

    static upvote (req,res,next){
        Question.findByIdAndUpdate(req.params.id,{$pull:{'Question.upvotes':[req.decode.id], 'Question.downvotes':[req.decode.id]}})
        .then(question=>{
            if(question.owner.toString() === req.decode.id) {
                next({
                    name: 'Bad Request',
                    message: 'You cannot upvote your own question!'
                }) 
            }
            question.downvotes.pull(req.decode.id);
            question.upvotes.pull(req.decode.id)
            question.upvotes.push(req.decode.id)
            Question.update(question).then(_=>{
                res.status(200).json({
                    upvoteTally: question.upvotes
                })
            })
        }).catch(err=>{
            if(err.name === 'CastError'){
                next({
                    name: 'NotFound',
                    message: 'Question not found'
                })
            } else {
                console.log(err)
                next(err)
            }
        })
    }

    static downvote (req,res,next){
        Question.findById(req.params.id)
        .then(question=>{
            if(question.owner.toString() === req.decode.id) {
                next({
                    name: 'Bad Request',
                    message: 'You cannot downvote your own question!'
                }) 
            }
            question.downvotes.pull(req.decode.id);
            question.upvotes.pull(req.decode.id)
            question.downvotes.push(req.decode.id)
            Question.update(question).then(_=>{
                res.status(200).json({
                    downvoteTally: question.downvotes.length
                })
            })
        }).catch(err=>{
            if(err.name === 'CastError'){
                next({
                    name: 'NotFound',
                    message: 'Question not found'
                })
            } else {
                console.log(err)
                next(err)
            }
        })
    }

    static clearVote (req,res,next){
        Question.findById(req.params.id)
        .then(question=>{
            question.downvotes.pull(req.decode.id);
            question.upvotes.pull(req.decode.id)
            Question.update(question).then(_=>{
                res.status(200).json({
                    upvoteTally: question.upvotes.length,
                    downvoteTally: question.downvotes.length
                })
            })
        }).catch(err=>{
            if(err.name === 'CastError'){
                next({
                    name: 'NotFound',
                    message: 'Question not found'
                })
            } else {
                console.log(err)
                next(err)
            }
        })
    }

    static update (req,res,next){
        Question.findByIdAndUpdate(req.params.id,{
            title : req.body.title,
            description : req.body.description,
        },{ new : true, omitUndefined : true})
        .then((question)=>{
            res.status(200).json({
                question
            })
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

    static delete (req,res,next){
        Question.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.status(200).json({
                message : "question deleted"
            })
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
}

module.exports = QuestionController