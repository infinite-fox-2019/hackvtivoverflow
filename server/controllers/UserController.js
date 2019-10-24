const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')
// const {OAuth2Client} = require('google-auth-library')

class UserController {
    static register (req,res,next) {
        const {username,email,password} = req.body
        User.create({username,email,password})
            .then(result => {
                let payload = {email:result.email, _id:result._id}
                let token = generateToken(payload)
                res.status(201).json({token, username})
            })
            .catch(next)
    }

    static login (req,res,next) {
        const {email,password} = req.body
        User.findOne({email})
        .then(user=>{
            if(user && comparePassword(password,user.password)) {
                let payload = {email:user.email, _id:user._id}
                let token = generateToken(payload)
                res.status(200).json({token, username:user.username})
            } else {
                throw {
                    msg: 'invalid email/password',
                    statusCode: 401
                }
            }
        })
        .catch(next)
    }

    // static signGoogle(req, res, next){
    //     const client = new OAuth2Client(process.env.CLIENT_ID);
    //     let username
    //     let email

    //     client.verifyIdToken({
            
    //         idToken: req.body.id_token,
    //         audience: process.env.GOOGLE
    //     })
    //         .then(ticket => {
    //             username = ticket.getPayload().name
    //             email =  ticket.getPayload().email
    //             return User.findOne({email})
    //         })
    //         .then(user => {
    //             if (user){
    //                 const payload = {email, _id:user._id}
    //                 let token = generateToken(payload)
    //                 res.status(201).json({token, username})
    //             }
    //             else{
    //                 return User.create({username, email, password:"google"})
    //             }
    //         })
    //         .then(result => {
    //             let payload = {email:result.email, _id:result._id}
    //             let token = generateToken(payload)
    //             res.status(201).json({token, username})
    //         })
    //         .catch(next)
    // }
}

module.exports = UserController