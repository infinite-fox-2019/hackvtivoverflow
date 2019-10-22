const { verifyToken } = require('../helpers/jwt')
const Question = require('../models/question');
const Answer = require('../models/answer');

module.exports = {
  authenticate: (req, res, next) => {
    try {
      const decode = verifyToken(req.headers.token)
      req.loggedUser = decode
      next()   
    }
    catch(err) {
      next(err)
    }
  },
  qAuthorize: (req, res, next) => {
    const {id} = req.params
    Question.findById(id)
      .then(question=>{
        if(question && question.userId.toString() === req.loggedUser.id){
          next()
        } else {
          res.status(403).json({message: 'Authorization failed'})
        }
      })
      .catch(next)
  },
  aAuthorize: (req, res, next) => {
    const {id} = req.params
    Answer.findById(id)
      .then(answer=>{
        if(answer && answer.userId.toString() === req.loggedUser.id){
          next()
        } else {
          res.status(403).json({message: 'Authorization failed'})
        }
      })
  }
}