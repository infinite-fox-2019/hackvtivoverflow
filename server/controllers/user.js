const User = require('../models/user')
const { tokenGenerate } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcryptjs')

class userController {
    static register(req, res, next) {
        const { name, email, password } = req.body
        User.create({ name, email, password })
            .then(user => {
                let payload = {
                    id: user._id
                }

                let token = tokenGenerate(payload)
                res.status(201).json({ id: user._id, token })
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ email })
            .then(user => {
                if (user && comparePassword(password, user.password)) {
                    let payload = {
                        id: user._id
                    }

                    let token = tokenGenerate(payload)
                    res.status(200).json({ id: user._id, token })
                } else {
                    next({
                        status: 400,
                        message: `invalid email/password`
                    })
                }
            })
            .catch(next)
    }
}

module.exports = userController