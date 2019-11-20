const Answer = require('../model/answer')
const Question = require('../model/question')

class Controller {
    static create(req, res, next) {
        let answer;
        Answer.create({
            answer: req.body.answer,
            user: req.loggedUser._id,
            question : req.params.id
        })
            .then(response => {
                answer = response
                return Question.updateOne({
                    _id : req.params.id
                }, { $push :  { answer : answer } } )
            })
            .then( updated => {
                res.status(201).json( {answer , updated} )
            })
            .catch(next)
    }

    static update(req, res, next) {
        let update = {}
        let allowedFields = ['answer']
        allowedFields.forEach(field => {
            for (let key in req.body) {
                if (key == field) update[key] = req.body[key]
            }
        });
        Answer.updateOne({ _id: req.params.id }, update)
            .then(updated => {
                res.status(200).json({ message: 'update answer success', updated })
            })
            .catch(next)
    }


    static upvote(req, res, next) {
        Answer.findById(req.params.id)
            .then(answer => {
                let votes = answer.votes
                let flag = false
                let data = {}
                votes.forEach(vote => {
                    if (String(vote.user) === req.loggedUser._id) {
                        flag = true
                        data = vote
                    }
                })
                if (!flag) {
                    return Answer.updateOne(
                        { _id: req.params.id },
                        {
                            $push:
                            {
                                votes:
                                {
                                    user: req.loggedUser._id,
                                    value: 1
                                }
                            }
                        }
                    )
                } else if (flag && data.value === 1) {
                    return Answer.updateOne(
                        { _id: req.params.id },
                        {
                            '$pull':
                            {
                                'votes':
                                {
                                    'user': req.loggedUser._id,
                                }
                            }
                        }
                    )
                } else if (flag && data.value === -1) {
                    return Answer.updateOne({
                        _id : req.params.id , 'votes.user': req.loggedUser._id 
                    }, {
                        '$set' : {
                            'votes.$.value' : 1
                        }
                    })
                }
            })
            .then(updated => {
                res.status(200).json({ message: 'upvotes success', updated })
            })
            .catch(next)
    }

    static downvote(req, res, next) {
        Answer.findById(req.params.id)
            .then(answer => {
                let votes = answer.votes
                let flag = false
                let data = {}
                votes.forEach(vote => {
                    if (String(vote.user) === req.loggedUser._id) {
                        flag = true
                        data = vote
                    }
                })
                if (!flag) {
                    return Answer.updateOne(
                        { _id: req.params.id },
                        {
                            $push:
                            {
                                votes:
                                {
                                    user: req.loggedUser._id,
                                    value: -1
                                }
                            }
                        }
                    )
                } else if (flag && data.value === -1) {
                    return Answer.updateOne(
                        { _id: req.params.id },
                        {
                            '$pull':
                            {
                                'votes':
                                {
                                    'user': req.loggedUser._id,
                                }
                            }
                        }
                    )
                } else if (flag && data.value === 1) {
                    return Answer.updateOne({
                        _id : req.params.id , 'votes.user': req.loggedUser._id 
                    }, {
                        $set : {
                            'votes.$.value' : -1
                        }
                    })
                }
            })
            .then(updated => {
                res.status(200).json({ message: 'downvote success', updated })
            })
            .catch(next)
    }

    static userAnswer(req,res,next){
        Answer.find({ user : req.loggedUser._id}).populate(['user' , 'question'])
        .then( answers => {
            res.status(200).json(answers)
        })
        .catch(next)
    }
}

module.exports = Controller