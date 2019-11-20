const User = require('../model/user')
const { hash, compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static register(req, res, next) {

        User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash(req.body.password)
        })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (!user) next({ name: "LoginError" })
                else if (!compare(req.body.password, user.password)) next({ name: "LoginError" })
                else {
                    let payload = {
                        username: user.username,
                        email: user.email,
                        _id: user._id,
                    }
                    let token = generateToken(payload)
                    res.status(200).json({ token, user: payload })
                }
            })
            .catch(next)
    }
}

module.exports = Controller