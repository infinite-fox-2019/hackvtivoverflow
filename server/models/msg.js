const { model, Schema } = require('mongoose')

const MsgSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  message: {
    type: String,
    required: [true, 'message is required']
  }
}, { timestamps: true })

const Msg = model('messages', MsgSchema)

module.exports = Msg