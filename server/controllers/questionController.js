const Question = require("../models/questions");

class QuestionController {
    static findAll (req,res,next) {
        Question.find()
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)
    }
    static findOne (req,res,next) {
        const UserId = req.params.id
        Question.findOne({ UserId })
            .then(question => {
                console.log(question);
                res.status(200).json(question)
            })
            .catch(next);
    }
    static create (req,res,next) {
        const UserId = req.loggedUser.id
        const { title, description } = req.body;
        Question.create({ title, description, UserId })
            .then(data => {
                console.log(data)
                res.status(201).json({ msg: 'Question Created!' });
            })
            .catch(next);
    }
}

module.exports = QuestionController;