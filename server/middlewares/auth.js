const { decodeToken } = require('../helpers/jwt');
const User = require('../models/user');

function authentication (req,res,next) {
    try{
        if (req.headers.token) {
            const decode = decodeToken(req.headers.token);
            if (decode) {
                req.loggedUser = decode;
                next()
            } else {
                throw error
            }
        } else {
            throw error
        }
    }
    catch(err){
        next({ msg: 'authen' })
    }
}

function authorization (req,res,next) {
    try{
        console.log(req.query)
        const id = req.params.id ;
        User.findById({ _id: id })
            .then(user => {
                if(user.email === req.loggedUser.email) {
                    next()
                } else {
                    throw error
                }
            })
            .catch(err=>{
                next({ msg: 'author' })
            })
    }
    catch(err) {
        next(err)
    }
}

module.exports = {
    authentication,
    authorization
}