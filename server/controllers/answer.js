const Answer = require('../models/answer')
const Ask = require('../models/ask')

class AnswerController {

    static create(req, res, next) {
        const { content } = req.body
        let answer = null
        Answer.create({ content, creator: req.decode.id })
            .then(result => {
                answer = result
                return Ask.findByIdAndUpdate(req.params.askId, {
                    $push: { answers: result._id }
                }, { new: true })
            })
            .then(ask => {
                res.status(201).json({ answer, ask })
            })
            .catch(next)
    }

    static upvote(req, res, next) {
        Answer.findById(req.params.id)
            .then(answer => {
                return Answer.findByIdAndUpdate(answer._id, {
                    $pull: { downvote: req.decode.id }
                }, { new: true })
            })
            .then(answer => {
                return Answer.findOne({ _id: answer._id, upvote: req.decode.id })
            })
            .then(answer => {
                if (answer) {
                    return Answer.findByIdAndUpdate(answer._id, {
                        $pull: { upvote: req.decode.id }
                    }, { new: true })
                } else {
                    return Answer.findByIdAndUpdate(req.params.id, {
                        $push: { upvote: req.decode.id }
                    }, { new: true })
                }
            })
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(next)
    }

    static downvote(req, res, next) {
        Answer.findById(req.params.id)
            .then(answer => {
                return Answer.findByIdAndUpdate(answer._id, {
                    $pull: { upvote: req.decode.id }
                }, { new: true })
            })
            .then(answer => {
                return Answer.findOne({ _id: answer._id, downvote: req.decode.id })
            })
            .then(answer => {
                if (answer) {
                    return Answer.findByIdAndUpdate(answer._id, {
                        $pull: { downvote: req.decode.id }
                    }, { new: true })
                } else {
                    return Answer.findByIdAndUpdate(req.params.id, {
                        $push: { downvote: req.decode.id }
                    }, { new: true })
                }
            })
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(next)
    }


    static update(req, res, next) {
        const { content } = req.body
        Answer.findByIdAndUpdate(req.params.id, { content }, { new: true })
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(next)
    }

    static remove(req, res, next) {
        Answer.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({ message: "Remove Answer Success" })
            })
            .catch(next)
    }
}

module.exports = AnswerController