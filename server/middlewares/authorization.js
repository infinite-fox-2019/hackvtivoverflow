const models = require("../models");

function question(req, res, next) {
  let userId = req.decode._id;
  let id = req.params.id;
  models.Question.findById(id).then(question => {
    if (question.userId == userId) next();
    else
      next({
        httpStatus: 401,
        msg: "unauthorized"
      });
  });
}

function answer(req, res, next) {
  let userId = req.decode._id;
  let id = req.params.id;
  models.Answer.findById(id).then(question => {
    if (question.userId == userId) next();
    else
      next({
        httpStatus: 401,
        msg: "unauthorized"
      });
  });
}

module.exports = {
  question,
  answer
};
