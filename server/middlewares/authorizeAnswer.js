const Answer = require('../models/answer')

module.exports = (req, res, next) => {
  const _id = req.params.id

  Answer
    .findOne({_id})
    .then(a => {
      if(a.user == req.loggedUser._id) next()
      else {
        next({status: 403, message: 'You not authorized to do this action'})
      }
    })
    .catch(next)
}