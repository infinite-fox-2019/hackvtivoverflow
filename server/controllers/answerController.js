const Answer = require('../models/answer');

class AnswerController {
    static findId (req,res,next) {
        const QuestionId = req.params.id;
        Answer.find({ QuestionId })
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
}

module.exports = AnswerController;