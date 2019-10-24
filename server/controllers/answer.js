const Answer = require("../models/answer")
const ObjectId = require("mongoose").Types.ObjectId

class AnswerController {
    static findByUser (req, res, next) {
        Answer.find({ user: req.loggedUser._id }).populate("user").populate("question").exec()
        .then(answers => {
            res.status(200).json(answers)
        })
        .catch(next)
    }
    static findAll (req, res, next) {
        const { question } = req.params
        Answer.find({ question }).populate("user").exec()
        .then(answers => {
            res.status(200).json(answers)
        })
        .catch(next)
    }
    static findOne (req, res, next) {
        const { id } = req.params
        Answer.findOne({ _id: id, user: req.loggedUser._id }).populate("question").exec()
        .then(answer => {
            res.status(200).json(answer)
        })
        .catch(next)
    }
    static create (req, res, next) {
        const { title, description } = req.body
        const { question } = req.params
        Answer.create({ title, description, user: req.loggedUser._id, question })
        .then(_ => {
            res.status(201).json({ response: "Answer Created Successfully" })
        })
        .catch(next)
    }
    static update (req, res, next) {
        const { id } = req.params
        let toUpdate = {}
        for (let prop in req.body) {
            if (req.body[prop]) {
                toUpdate[prop] = req.body[prop]
            }
        }
        Answer.updateOne({ _id: id, user: req.loggedUser._id }, toUpdate).exec()
        .then(_ => {
            res.status(200).json({ response: "Answer Updated Successfully" })
        })
        .catch(next)
    }
    static upvote (req, res, next) {
        const { id } = req.params
        Answer.findOne({ _id: id }).exec()
        .then(answer => {
            if (answer.upvote.indexOf(ObjectId(req.loggedUser._id)) === -1) {
                if (answer.downvote.indexOf(ObjectId(req.loggedUser._id)) !== -1) {
                    let slicedDownvote = answer.downvote
                    slicedDownvote.splice(slicedDownvote.indexOf(req.loggedUser._id), 1)
                    return Answer.updateOne({ _id: id }, { downvote: slicedDownvote, $push: { upvote: req.loggedUser._id } }).exec()
                } else {
                    return Answer.updateOne({ _id: id }, { $push: { upvote: req.loggedUser._id } })
                }
            } else {
                let slicedUpvote = answer.upvote
                slicedUpvote.splice(slicedUpvote.indexOf(req.loggedUser._id), 1)
                Answer.updateOne({ _id: id }, { upvote: slicedUpvote }).exec()
            }
        })
        .then(_ => {
            res.status(200).json({ response: "Upvoted Question Successfully" })
        })
        .catch(next)
    }
    static downvote (req, res, next) {
        const { id } = req.params
        Answer.findOne({ _id: id, user: req.loggedUser._id }).exec()
        .then(answer => {
            if (answer.downvote.indexOf(ObjectId(req.loggedUser._id)) === -1) {
                if (answer.upvote.indexOf(ObjectId(req.loggedUser._id)) !== -1) {
                    let slicedUpvote = answer.upvote
                    slicedUpvote.splice(slicedUpvote.indexOf(req.loggedUser._id), 1)
                    return Answer.updateOne({ _id: id }, { upvote: slicedUpvote, $push: { downvote: req.loggedUser._id } }).exec()
                } else {
                    return Answer.updateOne({ _id: id }, { $push: { downvote: req.loggedUser._id } })
                }
            } else {
                let slicedDownvote = answer.downvote
                slicedDownvote.splice(slicedDownvote.indexOf(req.loggedUser._id), 1)
                Answer.updateOne({ _id: id }, { downvote: slicedDownvote }).exec()
            }
        })
        .then(_ => {
            res.status(200).json({ response: "Downvoted Answer Successfully" })
        })
        .catch(next)
    }
}

module.exports = AnswerController