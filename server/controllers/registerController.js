User = require("../models/user")

class RegisterController{
    static register(req,res,next){
        const{username, email, password} = req.body
        User.create({username, email,password})
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch(next)

    }
}

module.exports = RegisterController