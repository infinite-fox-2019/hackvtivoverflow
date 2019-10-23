const { decodeToken } = require('../helpers/jwt')
const User = require('../models/User')

authentication = (req, res, next) => {
  if(!req.headers.access_token) {
    throw {status: 401, msg:'You have to login first'}
  }
  let email = decodeToken(req.headers.access_token).email 
  User.findOne({email})
  .then(user => {
    if(!user) {
      throw {status: 401, msg:'You have to login first'}
    } else {
      req.loggedUser = user
      next()
    }
  })
  .catch(next)
}

// authorization = (req, res, next) => {
//     Task.findByPk(req.params.id)
//     .then(task => {
//         if(!task) {
//             throw {status: 404, message: 'Task data not found'}
//         } else {
//             if(task.userId !== req.loggedUser.id) {
//                 throw {status: 401, message: 'You are unauthorized to access this data'}
//             } else {
//                 next()
//             }
//         }
//     })
//     .catch(next)
// }

module.exports = {
    authentication
}