const { varify } = require('../helpers/jwt')

function Authentication(req, res, next) {
    try {
        let decode = varify(req.headers.token)
        req.decode = decode
        next()
    } catch (err) {
        next(err)
    }
}

function Authorization(req, res, next) {

    Event.findOne({
        _id: eventId,
        member: req.decode.id
    })
        .then(event => {
            if (event) {
                next()
            } else {
                next({
                    status: 403,
                    message: `you don't have the authority to do this action`
                })
            }
        })
        .catch(next)
}

module.exports = {
    Authentication,
    Authorization
}