const Ask = require('../models/ask')
const Tag = require('../models/tag')

class AskController {
    static create(req, res, next) {
        const { title, content, tags } = req.body
        const tagsId = []
        tags.forEach(tag => {
            Tag.findOne({ name: tag })
                .then(tag => {
                    if (tag) {
                        tagsId.push(tag._id)
                    } else {
                        Tag.create({ name: tag })
                            .then(result => {
                                tagsId.push(result._id)
                            })
                    }
                })
                .catch(next)
        })

        Ask.create({ title, content, creator: req.decode.id, tags: tagsId })
            .then(ask => {
                Tag.updateOne({ name: })
                res.status(201).json(ask)
            })
            .catch(next)
    }

    static find(req, res, next) {
        Ask.find().populate('tags').populate('upvote').populate('downvote').populate('creator')
            .then(asks => {
                res.status(200).json(asks)
            })
            .catch(next)
    }
}