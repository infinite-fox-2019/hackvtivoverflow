const Question = require('../models/question')
const Answer = require('../models/answer')
const Tag = require('../models/tag')

class QuestionController {
  static create(req, res, next) {
    const { title, description, tags } = req.body;
    let loggedInUser = req.decoded._id;
    Question.create({
      title: title,
      description: description,
      user: loggedInUser,
      tags: tags
    })
      .then(data_question => {
        let id = data_question._id.toString()
        Tag.updateMany({ questions: { $all: [id] } }, { $pull: { questions: id } })
          .then(() => {
            Tag.updateMany({ name: { $in: this.tags } }, { $push: { questions: id } })
              .then(() => {
                console.log('presave done')
                next()
              })
          })
        res.status(201).json({
          message: `Question Successfully Created!`,
          data: data_question
        });
      })
      .catch(next);
  };

  static updatePut(req, res, next) {
    const { title, description, tags } = req.body;

    Question.updateOne(
      {
        _id: req.params.id
      },
      { title, description, tags }
    )
      .then(() => {
        let id = req.params.id
        let tags = tags
        Tag.updateMany({ questions: { $all: [id] } }, { $pull: { questions: id } })
          .then(() => {
            Tag.updateMany({ name: { $in: tags } }, { $push: { questions: id } })
              .then(() => {
                res.status(200).json({
                  message: "Success update your question"
                });
              })

            console.log('preUpdateOne')
            next()
          })
      })
      .catch(next);
  };

  static delete(req, res, next) {
    Question.deleteOne({
      _id: req.params.id
    })
      .then(() => {
        Tag.updateMany({ questions: { $all: [req.params.id] } }, { $pull: { questions: req.params.id } })
          .then(data => {
            // console.log(data);
            res.status(200).json({
              message: "Success delete question"
            })
          })
      })
      .catch(next);
    ;
  };

  static likeQuestion(req, res, next) {
    let loggedInUser = req.decoded._id
    Question.findOne({
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
              return Question.netralize({ _id: req.params.id, user: req.decoded._id })
                .then(data => {
                  res.status(200).json({
                    message: `You already like this answer, now it's update too netralize..`
                  })
                })
            } else {
              return Question.updateOne(
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
          next({
            status: 404,
            message: `Data not found!`
          });
        }
      })
      .catch(next);
  };

  static getOne(req, res, next) {
    Question.findOne({
      _id: req.params.id
    })
      .populate({ path: 'user', select: 'email name' })
      .then(data_question => {
        Answer.find({ questionId: req.params.id })
          .populate({ path: 'user', select: '_id name email' })
          .sort({ createdAt: -1 })
          .then(answer => {
            res.status(200).json({
              message: `Successfully get a question with id ${data_question._id}`,
              question: data_question,
              answer: answer
            });
          })
          .catch(err => {
            res.status(400).json({
              message: 'Data Not Found'
            });
          })
      })
      .catch(next);
  };

  static dislikeQuestion(req, res, next) {
    let loggedInUser = req.decoded._id
    Question.findOne({
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
              Question.netralize({ _id: req.params.id, user: req.decoded._id })
                .then(data => {
                  res.status(400).json({
                    message: `You already dislike this answer, now it's update too netralize..`
                  })
                })
            } else {
              Question.updateOne(
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
                .catch(err => {
                  res.status(400).json({
                    message: "You can't like your own answer"
                  });
                });
            }
          }
        } else {
          next({
            status: 404,
            message: "Data not found"
          })
        }
      })
      .catch(next);
  };

  static getAll(req, res, next) {
    Question.find({})
      .populate({ path: 'user', select: 'email name' })
      .sort({ createdAt: -1 })
      .then(data_questions => {
        res.status(200).json({
          message: `Success get all questions list`,
          questions: data_questions
        })
      })
      .catch(next);
  };

  static userQuestion(req, res, next) {
    console.log('here');
    Question.find({
      user: req.decoded._id
    })
      .sort({ createdAt: -1 })
      .then(data_question => {
        res.status(200).json({
          message: "List of my questions",
          questions: data_question
        });
      })
      .catch(next);
  }

  static filterTag(req, res, next) {
    let tagArr = [req.params.tag]
    Question.find({ tags: { $all: tagArr } })
      .sort({ createdAt: -1 })
      .then(data => {
        res.status(200).json({
          questions: data
        })
      })
      .catch(next)
  }

}

module.exports = QuestionController