const Thread = require('../models/thread')
const Reply = require('../models/reply')

class ReplyController {
    static async create(req, res, next) {
        const { title, content } = req.body
        try {
            const reply = await Reply.create({ title, content, owner: req.decode.id })
            await Thread.findByIdAndUpdate(req.params.id, { $push: { replies: reply._id } })
            res.status(201).json(reply)
        } catch (err) {
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
        const { title, content } = req.body
        try {
            let reply = await Reply.findByIdAndUpdate(req.params.replyId, { $set: { title, content } }, { new: true })
            res.status(200).json(reply)
        } catch (err) {
            next(err)
        }
    }
};

module.exports = ReplyController