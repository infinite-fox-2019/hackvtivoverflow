const User = require('../models/user')
const { createToken } = require('../helpers/jwt')
const { compare } = require('../helpers/bcryptjs')

class UserController {
    static register(req, res, next) {
        const { username, email, password } = req.body
        User.create({ username, email, password })
            .then((user) => {
                const token = createToken({ id: user._id })
                res.status(201).json({ token: "Bearer " + token })
            })
            .catch(next)
    }
    static login(req, res, next) {
        const { identity, password } = req.body
        User.findOne({ $or: [{ email: identity }, { username: identity }] })
            .then((user) => {
                if (user && compare(password, user.password)) {
                    const token = createToken({ id: user._id })
                    res.status(200).json({ token: "Bearer " + token })
                } else {
                    next({ status: 400, message: "Invalid Email / Username / Password" })
                }
            })
            .catch(next)
    }
};

module.exports = UserController