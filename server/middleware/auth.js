const { verify } = require('../helpers/jwt')
const Answer = require('../models/Answer')

function authentication(req, res, next) {
    const { token } = req.headers
    try {
        // payload is only contain id
        req.decode = verify(token)
        next()
    } catch (err) {
        next({
            status: 401,
            message: `Please login first`
        })
    }
}

function authorizationAnswer(req, res, next) {
    let userId = req.decode.id
    let id = req.params.id
    Answer.findOne({userId, _id: id})
        .then(answer =>{
            if(answer){
                next()
            } else {
                next({
                    status: 403,
                    message: 'You haven\'t authorize'
                })
            }
        })
    
   
}

module.exports = { authentication , authorizationAnswer}