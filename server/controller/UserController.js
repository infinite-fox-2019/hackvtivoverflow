const User = require('../models/User')
const { generateToken, verify } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')

    class UserController {

        static register(req, res, next) {
            const { email, password, role } = req.body
            User.create({ email, password, role })
                .then(user => {
                    let payload = {
                        id: user._id
                    }
                    let token = generateToken(payload)
                    console.log(token);
                    res.status(201).json({ token, id: user._id })
                })
                .catch(next)
        }

        static login(req, res, next) {
            const { email, password } = req.body
            User.findOne({ email })
                .then(user => {
                    if(user){
                        if (compare(password, user.password)) {
                            let payload = {
                                id: user._id
                            }
                            let token = generateToken(payload)
                            res.status(200).json({ token, id: user._id  })
                        } else {
                            next({
                                status: 403,
                                message: 'username/password is wrong'
                            })
                        }
                    } else {
                        next({
                            status: 403,
                            message: 'username/password is wrong'
                        })
                    }
                })
                .catch(next)
        }
}

module.exports = UserController