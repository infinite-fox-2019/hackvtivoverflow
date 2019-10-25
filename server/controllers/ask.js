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
        Ask.findById(req.params.id)
            .then(ask => {
                return Ask.findByIdAndUpdate(ask._id, {
                    $pull: { downvote: req.decode.id }
                }, { new: true })
            })
            .then(ask => {
                return Ask.findOne({ _id: ask._id, upvote: req.decode.id })
            })
            .then(ask => {
                if (ask) {
                    return Ask.findByIdAndUpdate(ask._id, {
                        $pull: { upvote: req.decode.id }
                    }, { new: true })
                } else {
                    return Ask.findByIdAndUpdate(ask._id, {
                        $push: { upvote: req.decode.id }
                    }, { new: true })
                }
            })
            .then(ask => {
                res.status(200).json(ask)
            })
            .catch(next)
    }

    static downvote(req, res, next) {
        Ask.findById(req.params.id)
            .then(ask => {
                return Ask.findByIdAndUpdate(ask._id, {
                    $pull: { upvote: req.decode.id }
                }, { new: true })
            })
            .then(ask => {
                return Ask.findOne({ _id: ask._id, downvote: req.decode.id })
            })
            .then(ask => {
                if (ask) {
                    return Ask.findByIdAndUpdate(ask._id, {
                        $pull: { downvote: req.decode.id }
                    }, { new: true })
                } else {
                    return Ask.findByIdAndUpdate(ask._id, {
                        $push: { downvote: req.decode.id }
                    }, { new: true })
                }
            })
            .then(ask => {
                res.status(200).json(ask)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const { title, content, tags } = req.body
        Ask.findByIdAndUpdate(req.params.id, { title, content, tags }, { new: true })
            .then(ask => {
                res.status(200).json(ask)
            })
            .catch(next)

    }

    static remove(req, res, next) {
        Ask.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({
                    message: `Delete Ask successfully`
                })
            })
            .catch(next)
    }
}

module.exports = AskController