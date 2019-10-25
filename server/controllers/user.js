const { generateToken } = require('../helpers/jwt')
const { compareHash } = require('../helpers/bcrypt')
const User = require('../models/user')

class UserController {
    static register (req, res, next) {
        User.create({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password
        })
        .then((user)=>{
            const payload = {
                id : user._id,
                username : user.username,
                email : user.email
            }
            const token = generateToken(payload)
            res.status(201).json({
                token,
                username : user.username
            })
        })
        .catch(next)
    }

    static login (req,res,next) {
        User.findOne({username : req.body.username})
        .then((user)=>{
            if (user){
                if (compareHash(req.body.password, user.password)){
                    return user
                } else {
                    next({name: 'NotFound', message : 'wrong password/username'})
                }
            } else {
                next({name: 'NotFound', message : 'wrong password/username'})
            }
        })
        .then((user)=>{
            const payload = {
                id : user._id,
                username : user.username,
                email : user.email
            }
            const token = generateToken(payload)
            res.status(200).json({
                token,
                username : user.username
            })
        })
        .catch(next)
    }

    static read (req,res,next){
        User.find().then((users)=>{
            res.status(200).json({
                users
            })
        }).catch(next)
    }
}

module.exports = UserController