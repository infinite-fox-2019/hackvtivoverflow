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

    }

    static downvote(req, res, next) {

    }

    static update(req, res, next) {

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