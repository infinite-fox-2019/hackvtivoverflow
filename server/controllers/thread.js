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
        Thread.create({ title, content, owner: userId })
            .then(async (thread) => {
                await tags.forEach(async el => {
                    let tag = await Tag.findOneAndUpdate({
                        name: el
                    }, {
                        $addToSet: { watchers: userId }
                    }, {
                        upsert: true
                    })
                    thread.tags.push(tag._id)
                })
                return thread.save()
            })
            .then((thread) => res.status(200).json(thread))
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
        Thread.findOne({ $or: [{ _id: id }, { slug: id }] })
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
                    thread.views++
                    return thread.save()
                }
                else next({ status: 400, message: "Thread not Found" })
            })
            .then((thread) => res.status(200).json(thread))
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
        Thread.findByIdAndUpdate(req.params.id, { $addToSet: { upvotes: req.decode.id }, $pull: { downvotes: req.decode.id } })
            .then(() => res.status(200).json({ message: "Thread upvoted" }))
            .catch(next)
    }
    static downvote(req, res, next) {
        Thread.findByIdAndUpdate(req.params.id, { $addToSet: { downvote: req.decode.id }, $pull: { upvote: req.decode.id } })
            .then(() => res.status(200).json({ message: "Thread downvoted" }))
            .catch(next)
    }

    static unvote(req, res, next) {
        Thread.findByIdAndUpdate(req.params.id, {
            $pull: { upvote: req.decode.id, downvote: req.decode.id }
        })
            .then(() => res.status(200).json({ message: "Unvoted thread" }))
            .catch(next)
    }
}

module.exports = ThreadController