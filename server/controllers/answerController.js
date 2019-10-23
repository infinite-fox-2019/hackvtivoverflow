const Answer = require('../models/answer');

class AnswerController {
    static findId (req,res,next) {
        const QuestionId = req.params.id;
        Answer.find({ QuestionId }).populate('UserId')
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err=>{
                next(err);
            })
    }
    static create (req,res,next) {
        const UserId = req.loggedUser.id;
        const QuestionId = req.params.id;
        const { response } = req.body;
        Answer.create({ response, QuestionId, UserId })
            .then(data => {
                res.status(201).json({ data, msg: 'Successfully Created!' })
            })
            .catch(next)
    }
    static updateUpAnswer (req,res,next) {
      const _id = req.body.id
      const id = req.loggedUser.id //userid
      console.log(req.body)
      Answer.findById({_id})
        .then(answer => {
          let pass = true;
          answer.upvotes.forEach((el, i) => {
            if(el == id) pass = false
          })
          if(!pass) throw {msg: 'upspam'}
          else {
            return Answer.findByIdAndUpdate({_id},{$push:{"upvotes": id}})
          }
        })
        .then(done => {
          return Answer.findById({_id})
        })
        .then(answer => {
          for(let i=0;i<answer.downvotes.length; i++) {
            if(answer.downvotes[i] == id) {
              answer.downvotes.splice(i,1)
            }
          }
          return Answer.findByIdAndUpdate({_id},{downvotes: answer.downvotes})
        })
        .then(success => {
          res.status(200).json(success)
        })
        .catch(next)
    }
    static updateDownVote (req,res,next) {
      const _id = req.body.id
      const id = req.loggedUser.id //userid
      Answer.findById({_id})
        .then(answer => {
          let pass = true;
          answer.downvotes.forEach((el, i) => {
            if(el == id) pass = false
          })
          if(!pass) throw {msg: 'downspam'}
          else {
            return Answer.findByIdAndUpdate({_id},{$push:{"downvotes": id}})
          }
        })
        .then(done => {
          return Answer.findById({_id})
        })
        .then(answer => {
          for(let i=0; i<answer.upvotes.length; i++ ){
            if(answer.upvotes[i] == id){
              answer.upvotes.splice(i, 1)
            }
          }
          return Answer.findByIdAndUpdate({_id},{upvotes: answer.upvotes})
        })
        .then(success => {
          res.status(200).json(success)
        })
        .catch(next)
    }
}

module.exports = AnswerController;