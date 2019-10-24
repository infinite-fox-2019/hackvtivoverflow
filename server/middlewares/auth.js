 
const { generateToken } = require('../helpers/jwt')
const { decodeToken } = require('../helpers/jwt')

const authentication = (req,res,next) => {
    try {
        req.loggedUser = decodeToken(req.headers.token, process.env.SALT)
        next()
    }
    catch {
        next({ name: 'AuthenticationError'})
    }
}

const authorization = (req,res,next) => {
  
}



module.exports = {
    authentication,
    authorization
}