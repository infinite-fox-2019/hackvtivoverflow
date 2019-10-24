const Thread = require('../models/thread')
const Reply = require('../models/reply')
const Tag = require('../models/tag')
const queryOptions = require('../helpers/threadQuery')
const { Types } = require('mongoose')

class ThreadController {
    static create(req, res, next) {
        const { title, content, tags } = req.body
        if (!Array.isArray(tags)) return next({ status: 400, message: "Tags must be an array" })
        const userId = req.decode.id
        let threadId
        let slug
        Thread.create({ title, content, owner: userId })
            .then(async (thread) => {
                let arr = []
                threadId = thread._id
                slug = thread.slug
                tags.forEach(el => {
                    arr.push(Tag.findOneAndUpdate({
                        name: el
                    }, {
                        $addToSet: { watchers: userId }
                    }, {
                        upsert: true, new: true
                    }))
                })
                let results = await Promise.all(arr)
                let tagIDs = []
                results.forEach(el => tagIDs.push(el._id))
                return thread.updateOne({ $push: { tags: { $each: tagIDs } } })
            })
            .then(() => res.status(200).json({ message: "Thread created", id: threadId, slug }))
            .catch(next)
    }

    static update(req, res, next) {
        const { title, content, tags } = req.body
        Thread.updateOne({ id: req.thread._id }, { $set: { title, content, tags } })
            .then(() => res.status(200).json({ message: "Thread updated" }))
            .catch(next)
    }

    static read(req, res, next) {
        const options = queryOptions(req.query)
        Thread.find({}, null, options)
            .populate('owner', '-password')
            .populate('tags')
            .then((threads) => res.status(200).json(threads))
            .catch(next)
    }

    static readOwner(req, res, next) {
        const options = queryOptions(req.query)
        Thread.find({ owner: req.decode.id }, null, options)
            .then((threads) => res.status(200).json(threads))
            .catch(next)
    }

    static readOne(req, res, next) {
        const options = queryOptions(req.query)
        const id = req.params.id
        let where = {}
        try {
            let castedId = Types.ObjectId(id)
            where._id = castedId
        } catch (error) {
            where.slug = id
        }
        let data
        Thread.findOne(where)
            .populate('owner', '-password')
            .populate('tags')
            .populate({
                path: 'replies',
                options,
                populate: {
                    path: 'owner',
                    select: '-password',
                }
            })
            .then((thread) => {
                if (thread) {
                    data = thread
                    let views = thread.views + 1
                    return thread.updateOne({ $set: { views } }, { timestamps: false })
                }
                else next({ status: 400, message: "Thread not Found" })
            })
            .then(() => res.status(200).json(data))
            .catch(next)
        /* Thread.aggregate([
            { $match: { _id: Types.ObjectId(id) } },
            {
                $project:
                {
                    title: 1,
                    content: 1,
                    owner: 1,
                    tags: 1,
                    replies: 1,
                    upvotes: 1,
                    downvotes: 1,
                    views: 1,
                    slug: 1,
                    upvotesAmount: { $size: "$upvotes" },
                    downvotesAmount: { $size: "$downvotes" },
                    votes: { $subtract: ["$upvotesAmount", "$downvotesAmount"] }
                }
            },
            {
                $lookup:
                {
                    from: 'User',
                    localField: 'owner',
                    foreignField: '_id',
                    as: 'ownerDetail'
                }
            },
            {
                $lookup:
                {
                    from: 'Replies',
                    pipeline:
                        [
                            {
                                $project:
                                {
                                    title: 1,
                                    content: 1,
                                    owner: 1,
                                    upvotes: 1,
                                    downvotes: 1,
                                    upvotesAmount: { $size: "$upvotes" },
                                    downvotesAmount: { $size: "$downvotes" },
                                    votes: { $subtract: ["$upvotesAmount", "$downvotesAmount"] }
                                },
                                $lookup:
                                {
                                    from: 'User',
                                    localField: 'owner',
                                    foreignField: '_id',
                                    as: 'ownerDetail'
                                }
                            }
                        ],
                    as: "SortedReplies"
                }
            }
        ]) */

    }

    static delete(req, res, next) {
        Reply.deleteMany({ _id: { $in: req.thread.replies } })
            .then(() => Thread.deleteOne({ _id: req.thread._id }))
            .then(() => res.status(200).json({ message: "Thread deleted" }))
            .catch(next)
    }

    static upvote(req, res, next) {
        Thread.findByIdAndUpdate(req.params.id, {
            $addToSet: { upvotes: req.decode.id },
            $pull: { downvotes: req.decode.id }
        }, { new: true })
            // .then(() => res.status(200).json({ message: "Thread upvoted" }))
            .then((thread) => res.status(200).json({ thread }))
            .catch(next)
    }
    static downvote(req, res, next) {
        Thread.findByIdAndUpdate(req.params.id, { $addToSet: { downvotes: req.decode.id }, $pull: { upvotes: req.decode.id } }, { new: true })
            .then((thread) => {
                res.status(200).json({ message: "Thread downvoted" })
            })
            .catch(next)
    }

    static unvote(req, res, next) {
        Thread.findByIdAndUpdate(req.params.id, {
            $pull: { upvotes: req.decode.id, downvotes: req.decode.id }
        })
            .then(() => res.status(200).json({ message: "Unvoted thread" }))
            .catch(next)
    }
}

module.exports = ThreadController