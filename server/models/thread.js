const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const threadSchema = new Schema({
    title: { type: String, required: [true, "Title Required"] },
    content: { type: String, required: [true, "Content Required"] },
    owner: { type: Schema.Types.ObjectId, ref: 'Users' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tags' }],
    replies: [{ type: Schema.Types.ObjectId, ref: 'Replies' }],
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    views: { type: Number, default: 0 },
    slug: { type: String, slug: "title", slugPaddingSize: 4, unique: true }
}, { timestamps: true })

threadSchema.pre('save', function (next) {
    this.upvotes.push(this.owner)
    next()
})

module.exports = mongoose.model('Threads', threadSchema)