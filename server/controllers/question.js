const Question = require("../models/question")
const Answer = require("../models/answer")
const ObjectId = require("mongoose").Types.ObjectId

class QuestionController {
    static findGlobal (req, res, next) {
        Question.find().populate("user").exec()
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(next)
    }
    static findAll (req, res, next) {
        Question.find({ user: req.loggedUser._id }).populate("user").exec()
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(next)
    }
    static findOne (req, res, next) {
        const { id } = req.params
        Question.findOne({ _id: id }).exec()
        .then(question => {
            res.status(200).json(question)
        })
        .catch(next)
    }
    static create (req, res, next) {
        const { title, description } = req.body
        Question.create({ title, description, user: req.loggedUser._id})
        .then(() => {
            res.status(201).json({ response: "Question Created Successfully" })
        })
        .catch(next)
    }
    static update (req, res, next) {
        const { id } = req.params
        let update = {}
        for (let prop in req.body) {
            if (req.body[prop]) {
                update[prop] = req.body[prop]
            }
        }
        Question.updateOne({ _id: id }, update).exec()
        .then(_ => {
            res.status(200).json({ response: "Question Updated Successfully" })
        })
        .catch(next)
    }
    static deleteOne (req, res, next) {
        const { id } = req.params
        Question.deleteOne({ _id: id }).exec()
        .then(_ => {
            return Answer.deleteMany({ question: id })
        })
        .then(_ => {
            res.status(200).json({ response: "Question Deleted Successfully" })
        })
        .catch(next)
    }
    static upvote (req, res, next) {
        const { id } = req.params
        Question.findOne({ _id: id }).exec()
        .then(question => {
            if (question.upvote.indexOf(ObjectId(req.loggedUser._id)) === -1) {
                if (question.downvote.indexOf(ObjectId(req.loggedUser._id)) !== -1) {
                    let slicedDownvote = question.downvote
                    slicedDownvote.splice(slicedDownvote.indexOf(req.loggedUser._id), 1)
                    return Question.updateOne({ _id: id }, { downvote: slicedDownvote, $push: { upvote: req.loggedUser._id } }).exec()
                } else {
                    return Question.updateOne({ _id: id }, { $push: { upvote: req.loggedUser._id } })
                }
            } else {
                let slicedUpvote = question.upvote
                slicedUpvote.splice(slicedUpvote.indexOf(req.loggedUser._id), 1)
                Question.updateOne({ _id: id }, { upvote: slicedUpvote }).exec()
            }
        })
        .then(_ => {
            res.status(200).json({ response: "Upvoted Question Successfully" })
        })
        .catch(next)
    }
    static downvote (req, res, next) {
        const { id } = req.params
        Question.findOne({ _id: id }).exec()
        .then(question => {
            if (question.downvote.indexOf(ObjectId(req.loggedUser._id)) === -1) {
                if (question.upvote.indexOf(ObjectId(req.loggedUser._id)) !== -1) {
                    let slicedUpvote = question.upvote
                    slicedUpvote.splice(slicedUpvote.indexOf(req.loggedUser._id), 1)
                    return Question.updateOne({ _id: id }, { upvote: slicedUpvote, $push: { downvote: req.loggedUser._id } }).exec()
                } else {
                    return Question.updateOne({ _id: id }, { $push: { downvote: req.loggedUser._id } })
                }
            } else {
                let slicedDownvote = question.downvote
                slicedDownvote.splice(slicedDownvote.indexOf(req.loggedUser._id), 1)
                Question.updateOne({ _id: id }, { downvote: slicedDownvote }).exec()
            }
        })
        .then(_ => {
            res.status(200).json({ response: "Downvoted Question Successfully" })
        })
        .catch(next)
    }
}

module.exports = QuestionController