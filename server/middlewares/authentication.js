const { verifyToken } = require('../helpers/jwt')

function authentication (req,res,next){
    console.log(req.headers.token)
    try{
        const decode = verifyToken(req.headers.token)
        req.decode = decode
        next()
    } catch (err){
        next({name: 'AuthorizationError', message : 'Authentication failed'})
    }
}

module.exports = authentication