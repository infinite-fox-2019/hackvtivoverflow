const { model, Schema } = require('mongoose')

const tagSchema = new Schema({
    name: { type: String, required: [true, 'Tag name required'] },
    watchers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    hits: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = model('Tags', tagSchema)