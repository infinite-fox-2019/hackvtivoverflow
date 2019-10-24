const Question = require('../model/question')
const Answer = require('../model/answer')


class Controller {
    static find(req,res, next){
        Question.find().populate(['user' , 'answer'])
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findUser(req,res,next){
        Question.find( { user : req.loggedUser._id } ).populate(['user' , 'answer'])
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req, res, next) {
        Question.create({
            title: req.body.title,
            question: req.body.question,
            user: req.loggedUser._id,
            tags : req.body.tags
        })
            .then(question => {
                res.status(201).json(question)
            })
            .catch(next)
    }

    static update(req, res, next) {
        let update = {}
        let allowedFields = ['title', 'question', 'tags']
        allowedFields.forEach(field => {
            for (let key in req.body) {
                if (key == field) update[key] = req.body[key]
            }
        });
        Question.updateOne({ _id: req.params.id }, update)
            .then(updated => {
                res.status(200).json({ message: 'update question success', updated })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        let promises = []
        promises.push(Answer.deleteMany({ question : req.params.id }))
        promises.push(Question.deleteOne({ _id: req.params.id }))
        return Promise.all(promises)
            .then(deleted => {
                res.status(200).json({ message: 'delete question success', deleted })
            })
            .catch(next)
    }

    static upvote(req, res, next) {
        Question.findById(req.params.id)
            .then(question => {
                let votes = question.votes
                let flag = false
                let data = {}
                votes.forEach(vote => {
                    if (String(vote.user) === req.loggedUser._id) {
                        flag = true
                        data = vote
                    }
                })
                if (!flag) {
                    return Question.updateOne(
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
                    return Question.updateOne(
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
                    return Question.updateOne({
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
        Question.findById(req.params.id)
            .then(question => {
                let votes = question.votes
                let flag = false
                let data = {}
                votes.forEach(vote => {
                    if (String(vote.user) === req.loggedUser._id) {
                        flag = true
                        data = vote
                    }
                })
                if (!flag) {
                    return Question.updateOne(
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
                    return Question.updateOne(
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
                    return Question.updateOne({
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

    static tag(req,res,next){
        Question.aggregate([
            // Unwind the array
            { "$unwind": "$tags" },
        
            // Group on tags with a count
            { "$group": {
                "_id": "$tags",
                "count": { "$sum": 1 }
            }},
        
            // Optionally sort the tags by count descending
            { "$sort": { "count": -1 } },
        
            // Optionally limit to the top "n" results. Using 10 results here
            { "$limit": 4 }
        ])
        .then( result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = Controller