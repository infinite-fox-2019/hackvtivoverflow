const { verifyUser } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) return next({ status: 401, message: "Please provide a token" })
        const auth = req.headers.authorization.replace('Bearer ', '')
        req.decode = verifyUser(auth)
        next()
    } catch (err) {
        next(err)
    }
}