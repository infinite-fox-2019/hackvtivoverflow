const question = require('../models/question')

function authorization (req, res, next) {
  const UserId = req.decode.id
  const { id } = req.params
  question.find({ UserId, _id: id })
    .then(data => {
      if (data.length === 0) {
        res.status(401).json({
          message: 'You are not authorized'
        })
      } else {
        next()
      }
    }).catch(next)
}

module.exports = authorization
