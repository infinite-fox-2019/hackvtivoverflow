const Msg = require('../models/msg');

module.exports = {
  postMsg (req, res, next) {
    const {message} = req.body;
    console.log(message)
    Msg.create({ message, UserId: req.loggedUser.id })
      .then(msg1 => {
        return Msg.findById(msg1._id).populate('UserId')
      })
      .then(msg => {
        res.status(200).json({msg})
      })
      .catch(next)
  },
  readMsg (req, res, next) {
    Msg.find().populate('UserId')
      .then(msgs => {
        res.status(200).json({msgs})
      })
      .catch(next)
  }
}