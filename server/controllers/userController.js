const User = require('../models/user');
const { comparePassword } = require('../helpers/hash');
const { signToken } =require('../helpers/jwt');

class UserController {
    static findOneUserforState (req,res,next) {
        User.findById(req.loggedUser.id)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }
    static login (req,res,next) {
        const { email, password } = req.body;
        if(email && password) {
            User.findOne({ email })
                .then(user => {
                    if(user && comparePassword(password, user.password)){
                        const payload = {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        };
                        const serverToken = signToken(payload);
                        res.status(200).json({ token: serverToken, user })
                    } else {
                        throw { status: 403, msg: 'wrong' }
                    }
                })
                .catch(next)
        }else{
            throw { status: 404, msg: 'annon' }
        }
    }
    static register (req,res,next) {
        const { username, password, email } = req.body;
        User.create({ username, password, email })
            .then(data => {
                const payload = { 
                    id: data._id,
                    username: data.username,
                    email: data.email
                 };
                const serverToken = signToken(payload);
                res.status(201).json({ token: serverToken, msg: 'Success Register', data })
            })
            .catch(err=>{
                next(err)
            })
    }
}

module.exports = UserController;