const Question = require("../models/Question")
const Answer = require("../models/Answer")
module.exports = {
    authorization (req, res, next) {
        console.log(req.loggedUser)
        let { id } = req.params
        Question.findOne({
            _id : id
        })
        .then ((result) => {
            if (result.UserId== req.loggedUser.id){
                next()
            } else {
                const err = new Error("Not authorized user")
                err.name = "Unauthorized"
                next(err)
            }
        })
        .catch (err => {
            next(err)
        })
    },
    authorizationAnswer (req, res, next) {
        let { id } = req.params
        Answer.findOne({
            _id: id
        })
        .then ((result) => {
            if (result.UserId== req.loggedUser.id){
                next()
            } else {
                const err = new Error("Not authorized user")
                err.name = "Unauthorized"
                next(err)
            }
        })
        .catch (err => {
            next(err)
        })

    }
}