const {verify} = require('../helpers/jwt')

function authentication(req, res, next){
  try{
     const token = req.headers.access_token
     const user = verify(token)
     req.loggedUser = user
     next()
  }
  catch{
    res.status(401).json({msg:'login needed'})
  }
}

function authorization(req, res, next){
  next()
  // const user = req.loggedUser._id
  // console.log(user);
  
  // const id = req.body.id
  // console.log(id);
  
  // if(id == user._id){
  //   next()
  // }
  // else{
  //   res.status(403).json({msg: 'not authorized'})
  // }
}

module.exports = {authentication, authorization}