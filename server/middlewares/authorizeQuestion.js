const Question = require('../models/question')

module.exports = (req, res, next) => {
  const _id = req.params.id
  
  Question
    .findOne({_id})
    .then(q => {
      if(q.user == req.loggedUser._id) next()
      else {
        next({status: 403, message: 'You not authorized to do this action'})
      }
    })
    .catch(next)
}