const User = require('../models/User')

module.exports = {
  register: (req, res, next) => {
    const { username, email, password } = req.body
    
    User.create({ username, email, password })
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
  }
}