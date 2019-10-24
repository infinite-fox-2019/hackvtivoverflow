const models = require("../models");

class Question {
  static store(req, res, next) {
    const userId = req.decode._id;
    const { title, description, tags } = req.body;

    models.Question.create({
      userId,
      title,
      description,
      tags
    })
      .then(question => {
        res.status(201).json({
          type: "success",
          message: "Question Created"
        });
      })
      .catch(next);
  }

  static all(req, res, next) {
    models.Question.find()
      .populate("userId")
      .then(allQuestions => {
        res.status(200).json({
          type: "success",
          allQuestions
        });
      })
      .catch(next);
  }

  static my(req, res, next) {
    const userId = req.decode._id;
    models.Question.find({
      userId
    })
      .populate("userId")
      .then(myQuestions => {
        res.status(200).json({
          type: "success",
          myQuestions
        });
      })
      .catch(next);
  }

  static getByTag(req, res, next) {
    models.Question.find({
      tags: { $in: [req.params.tag] }
    })
      .then(questions => {
        res.status(200).json(questions);
      })
      .catch(next);
  }

  static show(req, res, next) {
    const id = req.params.id;
    models.Question.findById(id)
      .populate("userId")
      .populate({
        path: "answers",
        populate: { path: "userId" }
      })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }

  static upvote(req, res, next) {
    let userId = req.decode._id;
    let { _id } = req.body;
    models.Question.findOne({
      _id: _id,
      upvotes: userId
    })
      .then(data => {
        if (data) {
          throw {
            httpStatus: 400,
            msg: "cant upvote"
          };
        } else {
          return models.Question.findOne({
            _id: _id,
            downvotes: userId
          });
        }
      })
      .then(response => {
        if (response) {
          return models.Question.findByIdAndUpdate(
            _id,
            {
              $pull: {
                downvotes: userId
              }
            },
            {
              new: true
            }
          );
        } else {
          return models.Question.findByIdAndUpdate(
            _id,
            {
              $push: {
                upvotes: userId
              }
            },
            {
              new: true
            }
          );
        }
      })
      .then(results => {
        res.status(200).json(results);
      })
      .catch(next);
  }

  static downvote(req, res, next) {
    let userId = req.decode._id;
    let { _id } = req.body;
    models.Question.findOne({
      _id: _id,
      downvotes: userId
    })
      .then(data => {
        if (data) {
          throw {
            httpStatus: 400,
            msg: "cant downvote"
          };
        } else {
          return models.Question.findOne({
            _id: _id,
            upvotes: userId
          });
        }
      })
      .then(response => {
        if (response) {
          return models.Question.findByIdAndUpdate(
            _id,
            {
              $pull: {
                upvotes: userId
              }
            },
            {
              new: true
            }
          );
        } else {
          return models.Question.findByIdAndUpdate(
            _id,
            {
              $push: {
                downvotes: userId
              }
            },
            {
              new: true
            }
          );
        }
      })
      .then(results => {
        res.status(200).json(results);
      })
      .catch(next);
  }

  static top(req, res, next) {
    models.Top.findOne({
      status: "top"
    })
      .populate("questions")
      .then(data => {
        let top = data.questions;
        res.status(200).json({
          top
        });
      });
  }

  static delete(req, res, next) {
    let id = req.params.id;
    models.Question.findByIdAndDelete(id)
      .then(question => {
        question.answers.forEach(answer => {
          models.Answer.findByIdAndDelete(answer._id);
        });
        res.status(200).json({
          message: "Success delete data"
        });
      })
      .catch(next);
  }

  static edit(req, res, next) {
    let id = req.params.id;
    const { title, description, tags } = req.body;
    models.Question.findByIdAndUpdate(
      id,
      {
        title,
        description,
        tags
      },
      {
        omitUndefined: true,
        runValidators: true
      }
    )
      .then(() => {
        res.status(200).json({
          message: "success edit data"
        });
      })
      .catch(next);
  }
}

module.exports = Question;
