const {verifyToken} = require('../helpers/jwt')
const User = require('../models/User')
const Question = require('../models/Question')


function authentication(req, res, next){
    try {
        let decodedToken = verifyToken(req.headers.token)
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
        .then(data => {
            if(data.userId == req.loggedUser._id) {
                next()
            } else{
                throw {
                    status: 401,
                    msg: "not authorized"
                }
            }
        })
        .catch(err => {
            next(err)
        })
}

function authorizationAnswer(req, res, next){
    // let {id} = req.params
    // Wp.findOne({_id:id})
    //     .then(article => {
    //         if(article.user == req.loggedUser._id) {
    //             next()
    //         } else{
    //             throw {
    //                 status: 401,
    //                 msg: "not authorized"
    //             }
    //         }
    //     })
    //     .catch(err => {
    //         next(err)
    //     })
}

module.exports = {authentication, authorizationQuestion, authorizationAnswer} 