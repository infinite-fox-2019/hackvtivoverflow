const Thread = require('../models/thread')
const Reply = require('../models/reply')
const { Types } = require('mongoose')

class ReplyController {
    static async create(req, res, next) {
        const { content } = req.body
        console.log(req.params)
        let where = {}
        try {
            let id = Types.ObjectId(req.params.id)
            where.id = id
        } catch (err) {
            where.slug = req.params.id
        }
        console.log(where)
        let reply
        try {
            reply = await Reply.create({ content, owner: req.decode.id })
            let thread = await Thread.findOneAndUpdate(where, { $push: { replies: reply._id } }, { new: true })
            if (!thread) {
                let err = new Error('Thread Not Found')
                err.status = 404
                throw err
            }
            res.status(201).json(reply)
        } catch (err) {
            if (reply) Reply.deleteOne({ _id: reply._id })
            next(err)
        }
    }

    static async read(req, res, next) {
        try {
            let replies = await Reply.find({ owner: req.decode.id })
            res.status(200).json(replies)
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            await Reply.findByIdAndDelete(req.params.replyId)
            await Thread.findByIdAndUpdate(req.params.id, { $pull: { replies: req.params.replyId } })
            res.status(200).json({ message: "Reply deleted" })
        } catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        const { content } = req.body
        try {
            let reply = await Reply.findByIdAndUpdate(req.params.replyId, { $set: { content } }, { new: true })
            res.status(200).json(reply)
        } catch (err) {
            next(err)
        }
    }
};

module.exports = ReplyController