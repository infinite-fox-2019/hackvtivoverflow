const Tag = require('../models/tag')
const Ask = require('../models/ask')

class TagCintroller {
    static find(req, res, next) {
        Tag.find().sort({ createdAt: -1 })
            .then(tags => {
                res.status(200).json(tags)
            })
            .catch(next)
    }

    static findByName(req, res, next) {
        let quest = null
        Ask.find({
            tags: { $elemMatch: { name: req.params.name } }
        })
            .then(asks => {
                quest = asks
                return Tag.findOne({ name: req.params.name })
            })
            .then(tag => {
                res.status(200).json({ tag, asks: quest })
            })
            .catch(next)
    }
}

module.exports = TagCintroller