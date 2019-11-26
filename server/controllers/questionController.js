const Question = require("../models/questionsModel");
const Answer = require('../models/answerModel')

class QuestionController {
  static async add(req, res, next) {
    try {
      let { title, desc, tags } = req.body.payload;
      // let { title, desc, tags } = req.body;
      let userId = req.loggedUser.id;
      console.log(req.body);
      console.log(req.loggedUser.id);
      const question = await Question.create({ userId, title, desc, tags });
      res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req, res, next) {
    try {
      let questions = await Question.find().sort({createdAt : 'desc'}).populate('answerId'); // belum populate dengan answerId, userId, dan Vote
      res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next) {
    try {
      let { _id } = req.params;
      let question = await Question.findOne({ _id }).populate('userId').populate('votes.userId').populate('answerId')
      res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  }

  static async upvote(req, res, next) {
    try {
      let { _id } = req.params;
      let { id } = req.loggedUser;
      let conditionOne = false;
      let conditionTwo = false;
      let conditionThree = false;
      let question = await Question.findOne({ _id });
      if (question.votes.length < 1) {
        let upvote = await Question.updateOne(
          { _id },
          {
            $push: {
              votes: {
                userId: id,
                vote: 1
              }
            }
          }
        );
        res.status(200).json(upvote);
      }
      question.votes.forEach(el => {
        if (el.userId == id) {
          if (el.vote == 1) {
            conditionTwo = true;
          } else {
            conditionThree = true;
          }
        } else {
          conditionOne = true;
        }
      });
      if (conditionOne) {
        let upvote = await Question.updateOne(
          { _id },
          {
            $push: {
              votes: {
                userId: id,
                vote: 1
              }
            }
          }
        );
        res.status(200).json(upvote);
      }
      if (conditionTwo) {
        let netral = await Question.updateOne(
          { _id },
          { $pull: { votes: { userId: id } } }
        );
        res.status(200).json(netral);
      }
      if (conditionThree) {
        if (conditionThree) {
          let pullFirst = await Question.updateOne(
            { _id },
            { $pull: { votes: { userId: id } } }
          );
          let pushThen = await Question.updateOne(
            { _id },
            {
              $push: {
                votes: {
                  userId: id,
                  vote: 1
                }
              }
            }
          );
          res.status(200).json(pushThen);
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async downvote(req, res, next) {
    try {
      let { _id } = req.params;
      let { id } = req.loggedUser;
      let conditionOne = false;
      let conditionTwo = false;
      let conditionThree = false;
      let question = await Question.findOne({ _id });
      console.log(question.votes);
      if (question.votes.length < 1) {
        let upvote = await Question.updateOne(
          { _id },
          {
            $push: {
              votes: {
                userId: id,
                vote: -1
              }
            }
          }
        );
        res.status(200).json(upvote);
      }
      question.votes.forEach(el => {
        console.log(el);
        if (el.userId == id) {
          if (el.vote == -1) {
            console.log('masuk om');
            conditionTwo = true;
          } else {
            console.log('masuk omssss');
            conditionThree = true;
          }
        } else {
          conditionOne = true;
        }
      });
      if (conditionOne) {
        let upvote = await Question.updateOne(
          { _id },
          {
            $push: {
              votes: {
                userId: id,
                vote: -1
              }
            }
          }
        );
        res.status(200).json(upvote);
      }
      if (conditionTwo) {
        let netral = await Question.updateOne(
          { _id },
          { $pull: { votes: { userId: id } } }
        );
        res.status(200).json(netral);
      }
      if (conditionThree) {
        let pullFirst = await Question.updateOne(
          { _id },
          { $pull: { votes: { userId: id } } }
        );
        let pushThen = await Question.updateOne(
          { _id },
          {
            $push: {
              votes: {
                userId: id,
                vote: -1
              }
            }
          }
        );
        res.status(200).json(pushThen);
      }
    } catch (error) {
      next(error);
    }
  }

  static async remove(req,res,next) {
    try {
      let {_id} = req.params
      let deleted = await Question.deleteOne({_id})
      let deleteAnswer = await Answer.deleteMany({"questionId" : `${_id}`})
      res.status(201).json(deleted)
    } catch (error) {
      next(error)
    }
  }

  static async scoring(req,res,next) {
    try {
      let {_id} = req.params
      let score = 0
      let quesion = await Question.findOne({_id})
      quesion.votes.forEach((el)=>{
        score += el.vote
      })
      res.status(201).json(score)
    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next){
    try {
        let updatedField = req.body
        let arr = ['title','desc','tags']
        let {_id} = req.params
        let obj = {}
        for (let key in updatedField){
          arr.forEach((element)=>{
            if (key === element){
              obj[key] = updatedField[key] 
            }
          })
        }
        const updated = await Question.updateOne({_id},{$set:obj})
        res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  }

}

module.exports = QuestionController;
