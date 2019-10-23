const Question = require("../models/Question")
const Answer = require("../models/Answer")

class QuestionController {
    static create (req, res, next) {
        let { title, description, tags } = req.body
        let UserId = req.loggedUser.id
        Question.create({
            title,
            description,
            tags,
            UserId
        })
        .then ( (result) => {
            res.status(201).json(result)
        })
        .catch (next)
    }

    static findAllQuestion (req, res, next) {
        Question.find()
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static findAll (req, res, next) {
        Question.find({
            UserId: req.loggedUser.id
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static updateQuestion (req, res, next) {
        let { title, description, id } = req.body
        Question.findOneAndUpdate({
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

    static deleteQuestion (req, res, next) {
        let { id } = req.body
        Question.findOneAndDelete({
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
        Question.findOne({
            _id: id
        })
        .then (result => {
            vote = result.votes + votes
            return  Question.findOneAndUpdate({
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
        let temp
        Question.findOne({
            _id: id
        })
        .then (result => {
            temp = result
            return Answer.find({
                QuestionId: id
            })
        })
        .then (result => {
            res.status(200).json({
                QuestionId: temp._id,
                title: temp.title,
                description: temp.description,
                votes: temp.votes,
                hasil: result
            })
        })
        .catch (err => {
            next(err)
        })
    }
}

module.exports = QuestionController