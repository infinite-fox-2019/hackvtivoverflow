User = require("../models/user")
const {comparePassword} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")

class LoginController{
    static login(req,res,next){
        const {email, password} = req.body
        User.findOne({email})
        .then(function(data){
            if(data && comparePassword(password,data.password)){
                let payload = {id: data._id, username : data.username, email : data.email}
                // console.log(payload)
                let token = generateToken(payload)
                // console.log({token})
                res.status(200).json({token, payload})
            }else{
                console.log("masuk err login")
                next ({
                    message: 'invalid email/password',
                    status : 401
                })
            }
        })
        .catch(next)
    }
}

module.exports = LoginController
