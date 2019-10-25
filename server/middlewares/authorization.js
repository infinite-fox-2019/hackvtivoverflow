const Question = require('../models/question')

function questionAuthorization (req,res,next) {
    Question.findById(req.params.id)
    .then(question=>{
        if(question){
            if(question.owner.toString() === req.decode.id) {
                next()
            } else {
                next({
                    name: 'AuthorizationError',
                    message: 'Authorization failed'
                })
            }
        } else {
            next({
                name: 'NotFound',
                message: 'Question not found'
            })
        }
    })
    .catch(err=>{
        if (err.name === 'CastError') {
            next({
                name: 'NotFound',
                message: 'Question not found'
            })
        } else {
            next(err)
        }
    })
}

module.exports = questionAuthorization