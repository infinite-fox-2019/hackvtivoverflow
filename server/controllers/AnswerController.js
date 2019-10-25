const Answer = require("../models/Answer")

class AnswerController {
    static create (req, res, next) {
        let { title, description, QuestionId } = req.body
        let UserId = req.loggedUser.id
        Answer.create({
            title,
            description,
            UserId,
            QuestionId
        })
        .then ( (result) => {
            res.status(201).json(result)
        })
        .catch (next)
    }

    static findAll (req, res, next) {
        let { id } = req.body
        Answer.find({
            QuestionId: id
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static updateAnswer (req, res, next) {
        let { title, description } = req.body
        let { id } = req.params
        Answer.findOneAndUpdate({
            _id : id
        }, {
            title,
            description
        })
        .then ( (result) => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static deleteAnswer (req, res, next) {
        let { id } = req.params
        Answer.findOneAndDelete({
            _id: id
        })
        .then ((result) => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static upVotes (req, res, next) {
        let { UserId, _id } = req.body
        Answer.findOne({_id})
            .then (result => {
                let temp = false
                for (let i = 0; i < result.downVotes.length; i++) {
                    if (UserId == result.downVotes[i]._id) {
                        result.downVotes.splice(i, 1)
                    }
                }
                for (let i = 0; i < result.upVotes.length; i++) {
                    if (UserId == result.upVotes[i]._id) {
                        temp = true
                    }
                }
                if (!temp) {
                    result.upVotes.push({
                        _id: UserId
                    })
                    return {upVotes: result.upVotes, downVotes: result.downVotes}
                } else {
                    let err = new Error ('tidak bisa memilih')
                    err.name = 'UnAuthorized'
                    next(err)
                }
            })
            .then (data => {
                Answer.findOneAndUpdate({
                    _id: _id
                }, {
                    upVotes: data.upVotes,
                    downVotes: data.downVotes
                })
                .then (() => {
                    res.status(200).json({upVotes: data.upVotes, downVotes: data.downVotes})
                })
            })
            .catch (err => {
                next(err)
            })
    }

    static downVotes (req, res, next) {
        let { UserId, _id } = req.body
        console.log(req.body)
        Answer.findOne({_id})
            .then (result => {
                let temp
                for (let i = 0; i < result.upVotes.length; i++) {
                    if (UserId == result.upVotes[i]._id) {
                        result.upVotes.splice(i, 1)
                    }
                }
                for (let i = 0; i < result.downVotes.length; i++) {
                    if (UserId == result.downVotes[i]._id) {
                        temp = true
                    }
                }
                if (!temp) {
                    result.downVotes.push({
                        _id: UserId
                    })
                    return {upVotes: result.upVotes, downVotes: result.downVotes}
                } else {
                    let err = new Error ('tidak bisa memilih')
                    err.name = 'UnAuthorized'
                    next(err)
                }
            })
            .then (data => {
                Answer.findOneAndUpdate({
                    _id: _id
                }, {
                    upVotes: data.upVotes,
                    downVotes: data.downVotes
                })
                .then (() => {
                    res.status(200).json({upVotes: data.upVotes, downVotes: data.downVotes})
                })
            })
            .catch (err => {
                next(err)
            })
    }

    static findOne (req, res, next) {
        let { id } = req.params
        Answer.findOne({
            _id: id
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }
}

module.exports = AnswerController