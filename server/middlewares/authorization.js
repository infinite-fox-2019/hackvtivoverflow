const Thread = require('../models/thread')
const Reply = require('../models/reply')


module.exports = {
    thread: (req, res, next) => {
        const userId = req.decode.id
        const threadId = req.params.id
        Thread.findById(threadId)
            .then((thread) => {
                if (thread) {
                    if (thread.owner == userId) {
                        req.thread = thread
                        next()
                    } else {
                        next({ status: 403, message: "Not owner of this thread" })
                    }
                } else {
                    next({ status: 404, message: "Thread not found" })
                }
            })
    },
    reply: (req, res, next) => {
        const userId = req.decode.id
        const replyId = req.params.id
        Reply.findById(replyId)
            .then((reply) => {
                if (reply) {
                    if (reply.owner == userId) {
                        req.reply = reply
                        next()
                    } else {
                        next({ status: 403, message: "Not owner of this reply" })
                    }
                } else {
                    next({ status: 404, message: "Reply not found" })
                }
            })
    }
}