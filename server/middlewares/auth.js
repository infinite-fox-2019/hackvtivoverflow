const { decodeToken } = require('../helpers/jwt')
const Question = require("../models/question")
const Answer = require("../models/answer")

const authorizedQuestion = (req, res, next) => {
    Question.findOne( { _id: req.params.id } )
    .then(question => {
        if (question) {
            if (question.user == req.loggedUser._id) {
                next()
            }
            else {
                next({ msg: "You Are Unauthorized" })
            }
        } else {
            next({ msg: 'Question Not Found' })
        }
    }).catch(next)
}

const authorizedAnswer = (req, res, next) => {
    Answer.findOne({ _id: req.params.id })
    .then((answer) => {
        if (answer) {
            if (answer.user == req.loggedUser._id) {
                next()
            } else {
                next({ status: 401, message: 'You Are Unauthorized!' })
            }
        } else {
            next({ status: 404, message: 'Answer Not Found' })
        }
    }).catch(next)
}
const authentication = (req, res, next) => {
    try {
        const { token } = req.headers
        const loggedUser = decodeToken(token)
        req.loggedUser = loggedUser
        next()
    } catch (err) {
        next({ status: 401, message: 'You Must Sign In First!' })
    }
}

module.exports = { authentication, authorizedQuestion, authorizedAnswer }