const Answer = require("../models/Answer")

class AnswerController {
    static create (req, res, next) {
        let { title, description, QuestionId } = req.body
        let UserId = req.loggedUser.id
        Answer.create({
            title,
            description,
            UserId,
            votes: 0,
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
        let { title, description, id } = req.body
        Answer.findOneAndUpdate({
            _id : id
        }, {
            title,
            description
        })
        .then ( () => {
            res.status(200).json({
                msg: "Berhasil diupdate"
            })
        })
        .catch (err => {
            next(err)
        })
    }

    static deleteAnswer (req, res, next) {
        let { id } = req.body
        Answer.findOneAndDelete({
            _id: id
        })
        .then (() => {
            res.status(200).json({
                msg: "Berhasil dihapus"
            })
        })
        .catch (err => {
            next(err)
        })
    }

    static vote (req, res, next) {
        let vote
        let { votes, id } = req.body
        Answer.findOne ({
            _id: id
        })
        .then (result => {
            vote = result.votes + votes
            return Answer.findOneAndUpdate({
                _id : id
            }, {
                votes: vote
            })
        })
        .then (result => {
            res.status(200).json(result)
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