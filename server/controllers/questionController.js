const Question = require("../models/questions");
const Answer = require('../models/answer');
const User = require('../models/user');
const mongoose = require('mongoose')

module.exports = {
  findAll (req,res,next) {
    console.log('masuk pak eko')
    Question.find().populate('UserId').sort([['createdAt','descending']])
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  },
  findQuestionUser (req,res,next) {
    const UserId = new mongoose.Types.ObjectId(req.loggedUser.id)
    Question.find({ UserId }).exec()
      .then(question => {
        res.status(200).json(question)
      })
      .catch(next);
  },
  getTopQuestion (req, res, next) {
    Question.find().sort([['views', 1]]).populate('UserId')
      .then(questions => {
        res.status(200).json({questions})
      })
      .catch(next)
  },
  findOneQuestion (req,res,next) {
    const _id = req.params.id;
    Question.findById({_id})
      .then(question => {
        let newViews = Number(question.views) + 1
        return Question.findByIdAndUpdate(_id, { views: newViews}, {new: true}).populate('UserId')
      })
      .then(question1 => {
        res.status(200).json(question1)
      })
      .catch(next)
  },
  create (req,res,next) {
    const UserId = req.loggedUser.id
    const { title, description, tags } = req.body;
    Question.create({ title, description, UserId, tags })
      .then(data => {
        res.status(201).json({ msg: 'Question Created!', question: data });
      })
      .catch(next);
  },
  findByTag (req,res,next) {
  const tag = req.params.name;
  Question.find().populate('UserId').sort([['createdAt','descending']])
    .then(questions => {
      const temp = []
      questions.forEach((el,i) => {
        for(let i=0;i<el.tags.length;i++) {
          if(el.tags[i] == tag){
            temp.push(el)
          }
        }
      })
      res.status(200).json(temp)
    })
    .catch(next)
  },
  findAllTag (req, res, next) {
    let tempTag = []
    Question.find()
      .then(questions => {
        questions.forEach((el, i) => {
          el.tags.forEach((tag,j) => {
            if(tempTag.length == 0) {
              tempTag.push(tag)
            } else {
              var counter = 0
              tempTag.forEach((temp, k) => {
                if(temp === tag) {
                  counter++
                }
              })
            }
            if(counter == 0) {
              tempTag.push(tag)
            }
          })
        })
        res.status(200).json({tag: tempTag})
      })
      .catch(next)
  },
  searchTitle (req,res,next) {
  const title = req.params.name;
  Question.find({title: new RegExp(title, 'i')}).populate('UserId')
    .then(datas => {
      res.status(200).json(datas)
    })
    .catch(next)
  },
  updateUpVote (req,res,next) {
    const id = req.loggedUser.id
    const _id = req.params.id
    Question.findById({_id})
      .then(question => {
        let pass = true;
        question.upvotes.forEach((el,i) => {
          if(el == id) {
            pass = false
          }
        })
        let passUp = true
        question.downvotes.forEach((el, i) => {
          if(el == id) passUp = false
        })
        if(!pass) throw {msg: 'downspam'}
        else if(!passUp) {
          return Question.findByIdAndUpdate(_id, {$pull: {downvotes: id}})
        } else {
          return Question.findByIdAndUpdate({_id},{ $push: {upvotes: id}})
        }
      })
      .then(success => {
        res.status(201).json(success)
      })
      .catch(next)
  },
  updateDownVote (req,res,next) {
    const id = req.loggedUser.id
    const _id = req.params.id
    Question.findById({_id})
      .then(question => {
        let pass = true;
        question.downvotes.forEach((el,i) => {
          if(el == id) {
            pass = false;
          }
        })
        let passUp = true
        question.upvotes.forEach((el, i) => {
          if(el == id) passUp = false
        })
        if(!pass) throw {msg: 'downspam'}
        else if(!passUp) {
          return Question.findByIdAndUpdate(_id, {$pull: {upvotes: id}})
        } else {
          return Question.findByIdAndUpdate({_id},{$push: {downvotes: id}})
        }
      })
      .then(success => {
        res.status(201).json(success)
      })
      .catch(next)
  },
  deleteQuestion (req,res,next) {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    Question.findByIdAndDelete({_id})
      .then(success => {
        return Answer.find({QuestionId: _id})
      })
      .then(answers => {
        return Answer.deleteMany({ QuestionId: _id})
      })
      .then(_ => {
        res.status(200).json({msg: "success delete all"})
      })
      .catch(next)
  },
  updateQuestion (req,res,next) {
    const _id = req.params.id
    Question.findByIdAndUpdate({_id},{title: req.body.title, description: req.body.description})
      .then(_ => {
      res.status(201).json({msg: 'success update'})
      })
      .catch(next)
  },
  findByWatchTag (req, res, next) {
    let tempUserWatch 
    User.findById(req.loggedUser.id)
      .then(user => {
        tempUserWatch = user.watchTag
        return Question.find().populate('UserId')
      })
      .then(question => {
        let tempQuestionWatchTag = []
        question.forEach((ques, a) => {
          ques.tags.forEach((tag, i) => {
            tempUserWatch.forEach((el, i) => {
              if(tag == el) {
                tempQuestionWatchTag.push(ques)
              }
            })
          })
        })
        res.status(200).json({questions: tempQuestionWatchTag})
      })
      .catch(next)
  }
}