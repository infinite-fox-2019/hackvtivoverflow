const {VerifyToken} = require('../helpers/jwt')
const Question = require('../models/question')
const Answer = require('../models/answer')

function authentication(req, res, next){
    try {
        let decodedToken = VerifyToken(req.headers.token)
        req.loggedUser = decodedToken
        next()
    }
    catch(err) {
        next(err)
    }
}

function authorizationQuestion(req, res, next){
    let {id} = req.params
    Question.findOne({_id:id})
        .then(question => {
            if(question.userId == req.loggedUser._id) {
                next()
            } 
            else{
                throw {
                    status: 401,
                    msg: "Not Authorized"
                }
            }
        })
        .catch(err => {
            next(err)
        })
}

function authorizationAnswer(req, res, next){
    let {id} = req.params
    Answer.findOne({_id:id})
        .then(answer => {
            if(answer.userId == req.loggedUser._id) {
                next()
            } 
            else{
                throw {
                    status: 401,
                    msg: "Not Authorized"
                }
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = {authentication, authorizationQuestion, authorizationAnswer} 