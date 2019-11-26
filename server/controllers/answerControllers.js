const Answer = require('../models/answerModel')
const Question = require('../models/questionsModel')

class AnswerController {

  static async findAll(req,res,next){
    try {
      let answers = await Answer.find()
      res.status(201).json(answers)
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req,res,next){
    try {
      let {_id} = req.params
      let answer = await Answer.findOne({_id})
      res.status(201).json(answer)
    } catch (error) {
      next(error)
    }
  }

  static async findSpecificUser(req,res,next){
    try {
      let userId = req.loggedUser.id
      let answers = await Answer.find({userId}).populate('questionId')
      res.status(201).json(answers)
    } catch (error) {
      next(error)
    } 
  }


  static async add(req,res,next){
    try {
      let {questionId,desc} = req.body.payload
      // let {questionId,desc} = req.body
      let userId = req.loggedUser.id
      // console.log(questionId,desc,userId);
      console.log(req.loggedUser);
      let created = await Answer.create({questionId,desc,userId})
      let updateQuestion = await Question.updateOne({_id:questionId},{$push:{answerId:created._id}})
      res.status(201).json({created,updateQuestion})
    } catch (error) {
      next(error)
    }
  }

  static async upvote(req, res, next) {
    try {
      console.log(req.params);
      console.log(req.loggedUser);
      let { _id } = req.params;
      let { id } = req.loggedUser;
      let conditionOne = false;
      let conditionTwo = false;
      let conditionThree = false;
      let answer = await Answer.findOne({ _id });
      
      if (answer.votes.length < 1) {
        console.log('masuk atas');
        let upvote = await Answer.updateOne(
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
        console.log(answer.votes,'atas');
        res.status(200).json(upvote);
      }
      answer.votes.forEach(el => {
        if (el.userId == id) {
          if (el.vote == 1) {
            console.log('masuk two');
            conditionTwo = true;
          } else {
            console.log('masuk three');
            conditionThree = true;
          }
        } else {
          console.log('masuk one');
          conditionOne = true;
        }
      });
      if (conditionOne) {
        let upvote = await Answer.updateOne(
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
        console.log(answer.votes,'one');
        res.status(200).json(upvote);
      }
      if (conditionTwo) {
        let netral = await Answer.updateOne(
          { _id },
          { $pull: { votes: { userId: id } } }
        );
        console.log(answer.votes,'two');
        res.status(200).json(netral);
      }
      if (conditionThree) {
        let pullFirst = await Answer.updateOne(
          { _id },
          { $pull: { votes: { userId: id } } }
        );
        let pushThen = await Answer.updateOne(
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
        console.log(answer.votes,'three');
        res.status(200).json(pushThen);
      }
    } catch (error) {
      console.log(error);
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
      let answer = await Answer.findOne({ _id });
      if (answer.votes.length < 1) {
        let downvote = await Answer.updateOne(
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
        console.log('masuk atas');
        res.status(200).json(downvote);
      }
      answer.votes.forEach(el => {
        if (el.userId == id) {
          if (el.vote == -1) {
            console.log('masuk two');
            conditionTwo = true;
          } else {
            console.log('masuk three');
            conditionThree = true;
          }
        } else {
          console.log('masuk one');
          conditionOne = true;
        }
      });
      if (conditionOne) {
        let downvote = await Answer.updateOne(
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
        res.status(200).json(downvote);
      }
      if (conditionTwo) {
        let netral = await Answer.updateOne(
          { _id },
          { $pull: { votes: { userId: id } } }
        );
        res.status(200).json(netral);
      }
      if (conditionThree) {
        let pullFirst = await Answer.updateOne(
          { _id },
          { $pull: { votes: { userId: id } } }
        );
        let pushThen = await Answer.updateOne(
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
      let deleted = await Answer.remove({_id})
      res.status(201).json(deleted)
    } catch (error) {
      next(error)
    }
  }

  static async scoring(req,res,next) {
    try {
      let {_id} = req.params
      let score = 0
      let answer = await Answer.findOne({_id})
      answer.votes.forEach((el)=>{
        score += el.vote
      })
      res.status(201).json(score)
    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next) {
    try {
      let updatedField = req.body
      let arr = ['desc']
      let {_id} = req.params
      let obj = {}
      for (let key in updatedField){
        arr.forEach((element)=>{
          if (key === element){
            obj[key] = updatedField[key] 
          }
        })
      }
      const updated = await Answer.updateOne({_id},{$set:obj})
      res.status(200).json(updated)
  } catch (error) {
    next(error)
  }
  }
}

module.exports = AnswerController