const Ask = require('../models/ask')
const Tag = require('../models/tag')

class AskController {
    static create(req, res, next) {
        const { title, content, tags } = req.body

        Ask.create({ title, content, creator: req.decode.id, tags, watcher: [req.decode.id] })
            .then(ask => {
                res.status(201).json(ask)
            })
            .catch(next)
    }

    static find(req, res, next) {
        Ask.find().populate('answers').populate('upvote', 'name').populate('downvote', 'name').populate('creator', 'name').sort({ createdAt: -1 })
            .then(asks => {
                res.status(200).json(asks)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        Ask.findById(req.params.id).populate('answers').populate('upvote', 'name').populate('downvote', 'name').populate('creator', 'name')
            .then(ask => {
                res.status(200).json(ask)
            })
            .catch(next)
    }

    static myAsk(req, res, next) {
        Ask.find({ creator: req.decode.id }).populate('answers').populate('upvote', 'name').populate('downvote', 'name').populate('creator', 'name').sort({ 'createdAt': -1 })
            .then(asks => {
                res.status(200).json(asks)
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

    }
}

module.exports = AskController