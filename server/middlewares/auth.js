const { verifyToken } = require('../helpers/jwt')

function authen (req,res,next) {
  try {
    const decoded = verifyToken(req.headers.token)
    req.decoded = decoded
    next()
  }catch(err) {
    res.status(403).json({msg: 'You dont have authentification'})
  }
}

module.exports = authen