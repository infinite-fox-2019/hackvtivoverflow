const User = require('../models/user')
const { createToken } = require('../helpers/jwt')
const { compare } = require('../helpers/bcryptjs')

class UserController {
    static register(req, res, next) {
        const { username, email, password } = req.body
        User.create({ username, email, password })
            .then((user) => {
                res.status(201).json({ message: "User Created" })
            })
            .catch(next)
    }
    static login(req, res, next) {
        const { identity, password } = req.body
        const expire = req.query.expire || 60 * 60 * 24
        User.findOne({ $or: [{ email: identity }, { username: identity }] })
            .then((user) => {
                if (user && compare(password, user.password)) {
                    const token = createToken({ id: user._id }, expire)
                    res.status(200).json({
                        token: "Bearer " + token,
                        username: user.username,
                        email: user.email,
                        gravatar: user.gravatar,
                        _id: user._id
                    })
                } else {
                    next({ status: 400, message: "Invalid Email / Username / Password" })
                }
            })
            .catch(next)
    }
};

module.exports = UserController