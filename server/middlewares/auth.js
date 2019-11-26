let verifyToken = require('../helpers/jwt').verifyToken

function authentication(req,res,next){
  try {
    let decodedToken = verifyToken(req.headers.token)
    req.loggedUser = decodedToken
    next()
  } catch (error) {
    next(error)
  }
}

function authorization(req,res,next){
  
  
}

module.exports = {authentication,authorization}