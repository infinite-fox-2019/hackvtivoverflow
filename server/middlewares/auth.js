const {verifyToken} = require("../helpers/jwt")
const User = require("../models/user")

authentication = function(req, res, next){
    try{
        req.loggedUser = verifyToken(req.headers.token)
        next()
    }
    catch(err){
        next ({
            status : 403,
            message : "not login"
        })
    }
}

authorization = function(req,res,next){
    User.findOne({_id: req.loggedUser.id})
    .then(data=> {
        let ansOrQuest = req.params.id
        if(data.listAnswers.includes(ansOrQuest) || data.listQuestions.includes(ansOrQuest) ){
            next()
        }else {
            next({
                status : 403,
                message : "Not Authorized"
            })
        }
    })
}

module.exports = {authentication, authorization}