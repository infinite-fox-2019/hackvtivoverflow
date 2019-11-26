const Question = require('../models/questionsModel')
  
  async function upvotes(_id,id){
    try {
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
        return upvote
        // res.status(200).json(upvote);
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
        return upvote
        // res.status(200).json(upvote);
      }
      if (conditionTwo) {
        let netral = await Question.updateOne(
          { _id },
          { $pull: { votes: { userId: id } } }
        );
        // res.status(200).json(netral);
        return netral
      }
      if (conditionThree) {
        let updateCond = await Question.updateOne(
          { "votes.userId": id },
          {
            $set: {
              "votes.$.vote": 1
            }
          }
        );
        // res.status(200).json(updateCond);
        return updateCond
      }
    } catch (error) {
      next(error);
    }

  }
  
  module.exports = upvotes