const Tag = require('../models/tag')

class TagController {
    static read(req, res, next) {
        let { limit, sort, order, q } = req.query
        sort ? sort : sort = 'length'
        order ? order : order = -1;
        let pipe = {}
        pipe.$sort = { [sort]: order }
        if (q) pipe.$match = { name: { $regex: q, $options: 'i' } }
        Tag.aggregate(
            [
                {
                    $project:
                    {
                        _id: 1,
                        name: 1,
                        watchers: 1,
                        hits: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        length: { $size: "$watchers" }
                    }
                },
                pipe,
                {
                    $limit: limit || Tag.count()
                }
            ]
        )
            .then((tags) => res.status(200).json(tags))
            .catch(next)
    }

    static unwatch(req, res, next) {
        Tag.findByIdAndUpdate(req.params.id, { $pull: { watchers: req.decode.id } })
            .then(() => res.status(200).json({ message: "Tag unwatched" }))
            .catch(next)
    }

    static watch(req, res, next) {
        Tag.findByIdAndUpdate(req.params.id, { $push: { watchers: req.decode.id } })
            .then(() => res.status(200).json({ message: "Tag watched" }))
            .catch(next)
    }

    static clicked(req, res, next) {
        Tag.findByIdAndUpdate(req.params.id, { $inc: { hits: 1 } })
            .then(() => res.status(200).json({ message: "Tag Clicked" }))
            .catch(next)
    }
};

module.exports = TagController