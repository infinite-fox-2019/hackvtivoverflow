const {decodeToken} = require('../helpers/jwt')

function authentication (req,res,next) {
  if(req.headers.authorization){
    let token = req.headers.authorization
    console.log(req.headers,"<<<<<<<<<<<<<<<<")
    req.loggedUser = decodeToken(token)
    next()
  }
  else{
    res.status(403).send("Invalid token")
  }
}

function authorization (req,res,next) {
  if(true){
    
  }
  next()
}

module.exports = {
  authentication,authorization
}