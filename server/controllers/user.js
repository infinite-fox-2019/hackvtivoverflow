const User = require("../models/user")
const { comparePassword } = require("../helpers/bcrypt")
const { encodeToken, decodeToken } = require("../helpers/jwt")

class UserController {
    static login (req, res, next) {
        const { email, password } = req.body
        User.findOne({ email }).exec()
        .then(user => {
            if (user && comparePassword(password, user.password)) {
                const { _id, username, email, password } = user
                const payload = { _id, username, email, password }
                const token = encodeToken(payload)
                res.status(200).json({ _id, username, email, token })
            } else {
                next({ msg: "Incorrect Email / Password" })
            }
        })
        .catch(next)
    }
    static register (req, res, next) {
        const { username, email, password } = req.body
        User.create({ username, email, password })
        .then(user => {
            const { _id, username, email, password } = user
            const payload = { _id, username, email, password }
            const token = encodeToken(payload)
            res.status(201).json({ _id, username, email, token })
        })
        .catch(next)
    }
    static refresh (req, res, next) {
        const { token } = req.params
        const user = decodeToken(token)
        User.findOne({ _id: user._id }).exec()
        .then(user => {
            if (user) {
                const { _id, username, email, password } = user
                const payload = { _id, username, email, password }
                const token = encodeToken(payload)
                res.status(200).json({ _id, username, email, token })
            } else {
                next({ msg: "User Not Found" })
            }
        })
        .catch(next)
    }
}

module.exports = UserController