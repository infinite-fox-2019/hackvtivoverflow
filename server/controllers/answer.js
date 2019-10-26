const models = require("../models");

class Answer {
  static create(req, res, next) {
    let { description, questionId } = req.body;
    const userId = req.decode._id;
    models.Answer.create({
      description,
      userId
    })
      .then(data => {
        return models.Question.findByIdAndUpdate(
          questionId,
          { $push: { answers: data._id } },
          { new: true, runValidators: true }
        ).then(data => {
          res.status(200).json({
            data
          });
        });
      })
      .catch(next);
  }

  static my(req, res, next) {
    const userId = req.decode._id;
    models.Answer.find({
      userId
    })
      .populate("userId")
      .then(myAnswers => {
        res.status(200).json({
          type: "success",
          myAnswers
        });
      })
      .catch(next);
  }

  static show(req, res, next) {
    const id = req.params.id;
    models.Answer.findById(id)
      .populate("userId")
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }

  static upvote(req, res, next) {
    let userId = req.decode._id;
    let { _id } = req.body;
    models.Answer.findOne({
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
          return models.Answer.findOne({
            _id: _id,
            downvotes: userId
          });
        }
      })
      .then(response => {
        if (response) {
          return models.Answer.findByIdAndUpdate(
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
          return models.Answer.findByIdAndUpdate(
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
    models.Answer.findOne({
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
          return models.Answer.findOne({
            _id: _id,
            upvotes: userId
          });
        }
      })
      .then(response => {
        if (response) {
          return models.Answer.findByIdAndUpdate(
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
          return models.Answer.findByIdAndUpdate(
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

  static delete(req, res, next) {
    let id = req.params.id;
    models.Answer.findByIdAndDelete(id)
      .then(answer => {
        return models.Question.findOneAndUpdate(
          {
            answers: { $in: [answer._id] }
          },
          {
            $pull: {
              answers: answer._id
            }
          }
        );
      })
      .then(() => {
        res.status(200).json({
          message: "Success delete data"
        });
      })
      .catch(next);
  }

  static edit(req, res, next) {
    let id = req.params.id;
    let { description } = req.body;
    models.Answer.findByIdAndUpdate(
      id,
      {
        description
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

module.exports = Answer;
