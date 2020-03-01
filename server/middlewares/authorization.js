const Question = require('../models/question')
const Answer = require('../models/answer')

function questionAuth(req, res, next){
  console.log(req.decoded);
  Question.findById(req.params.id)
  .then(isFound =>{
    if (isFound.user == req.decoded._id){
        next()
      }
      else {
        res.status(401).json({
          message : 'Unathorized'
        })
      }
  })
  .catch(() =>{
    res.status(404).json({
      message: 'Not Found'
    })
  })
}


function answerAuth(req, res, next){
    Answer.findById(req.params.id)
    .then(isFound =>{
        if (isFound.user == req.decoded._id){
          next()
        }
        else {
          res.status(401).json({
            message : 'Unathorized'
          })
        }
    })
    .catch(() =>{
      res.status(404).json({
        message: 'Not Found'
      })
    })
  }

module.exports = {questionAuth, answerAuth}