const Answer = require("../models/answer");

class AnswerController {
  static create(req, res, next) {
    let loggedInUser = req.decoded._id
    Answer.create({
      answer: req.body.answer,
      questionId: req.params.id,
      user: loggedInUser
    })
      .then(result => {
        res.status(201).json({
          message: `Answer Succesfully Created!`,
          data: result
        });
      })
      .catch(next)
  };
  static updateAnswer(req, res, next) {
    const { answer } = req.body
    Answer.update(
      {
        _id: req.params.id,
        user: req.decoded._id
      },
      {
        answer: answer
      }
    )
      .then(() => {
        res.status(201).json({
          message: `answer successfully updated`
        });
      })
      .catch(next);
  }


  static getOneAnswer(req, res, next) {
    Answer.findOne({
      _id: req.params.id
    })
      .populate({ path: 'user', select: 'email name' })
      .populate("questionId")
      .then(result => {
        res.status(200).json({
          message: `Success get answer with id ${req.params.id}`,
          data: result
        });
      })
      .catch(() => {
        next({
          status: 404,
          message: "Data Not Found"
        })
      });
  };

  static likeAnswer(req, res, next) {
    let loggedInUser = req.decoded._id
    Answer.findOne({
      _id: req.params.id
    })
      .then(result => {
        if (result) {
          if (result.user == loggedInUser) {
            res.status(400).json({
              message: `you cannot like your own question!`
            });
          } else {
            if (result.likes.includes(loggedInUser)) {
              return Answer.netralize({ _id: req.params.id, user: req.decoded._id })
                .then(data => {
                  res.status(200).json({
                    message: `You already like this question, now it's update too netralize..`
                  })
                })
            } else {
              return Answer.updateOne(
                {
                  _id: req.params.id
                },
                {
                  $push: { likes: loggedInUser },
                  $pull: { dislikes: loggedInUser }
                }
              )
                .then(result1 => {
                  res.status(201).json({
                    message: `Like++`
                  });
                })
                .catch(err => {
                  res.status(400).json({
                    message: "You can't like your own answer"
                  });
                });
            }
          }
        } else {
          res.status(400).json({
            message: `Data not found!`
          });
        }
      })
      .catch(next)
  };

  static dislikeAnswer(req, res, next) {
    let loggedInUser = req.decoded._id
    Answer.findOne({
      _id: req.params.id
    })
      .then(result => {
        if (result) {
          if (result.user == loggedInUser) {
            res.status(400).json({
              message: `you cannot dislike your own question!`
            });
          } else {
            if (result.dislikes.includes(loggedInUser)) {
              Answer.netralize({ _id: req.params.id, user: req.decoded._id })
                .then(data => {
                  res.status(400).json({
                    message: `You already dislike this question, now it's update too netralize..`
                  })
                })
            } else {
              Answer.updateOne(
                {
                  _id: req.params.id
                },
                {
                  $push: { dislikes: loggedInUser },
                  $pull: { likes: loggedInUser }
                }
              )
                .then(result1 => {
                  res.status(200).json({ message: 'Dislike++' })
                })
                .catch(() => {
                  next({
                    status: 400,
                    message: "You can't like your own answer"
                  })
                });
            }
          }
        } else {
          next({
            status: 404,
            message: `Data not found!`
          })
        }
      })
      .catch(next);
  };

}

module.exports = AnswerController


