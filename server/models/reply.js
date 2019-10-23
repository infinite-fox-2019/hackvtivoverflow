const { model, Schema } = require('mongoose')

const replySchema = new Schema({
    title: { type: String, required: [true, "Title Required"] },
    content: { type: String, required: [true, "Content Required"] },
    owner: { type: Schema.Types.ObjectId, ref: 'Users' },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
}, { timestamps: true })

replySchema.pre('save', function (next) {
    this.upvotes.push(this.owner)
    next()
})

module.exports = model('Replies', replySchema)