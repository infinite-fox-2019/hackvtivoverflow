const Answer = require('../models/Answer')


class AnswerController {

    static create(req, res, next){
        const { title, description, questionId } = req.body
        let userId = req.decode.id
        Answer.create({ title, description, questionId, userId })
            .then(answer =>{
                res.status(201).json(answer)
            })
            .catch(next)
    }

    static findByUser(req, res, next){
        const userId = req.decode.id
        Answer.find({ userId }).populate('questionId')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)
    }

static findByQuestionId(req, res, next){
        const questionId = req.params.questionId
        Answer.find({ questionId }).populate('questionId').populate('userId')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)
    }

    static findById(req ,res, next){
        const id = req.params.id
        Answer.findById(id)
            .then(answer =>{
                res.status(200).json(answer)
            })
            .catch(next)
    }

    static search(req, res, next) {
        const { keyword } = req.query     
            Answer.find({
                $or: [
                    {
                        title: {
                            $regex: `${keyword}`, $options: 'i'
                        }
                    },
                    {
                        description: {
                            $regex: `${keyword}`, $options: 'i'
                        }
                    }
                ]
            }).populate('userId', 'email').sort({ updatedAt: -1 })
                .then(answers => {
                    res.status(200).json(answers)
                })
                .catch(next)
        
    }

    static update(req, res, next){
        let answerId = req.params.id
        let { title, description, tags, votes } = req.body

        Answer.findByIdAndUpdate(answerId, { title, description, tags, votes }, { omitUndefined: true })
            .then(answer =>[
                res.status(200).json(answer)
            ])
            .catch(next)
    }

    static delete(req, res, next){
        let answerId = req.params.id
        Answer.findByIdAndDelete(answerId)
        .then(() =>[
            res.status(200).json({
                message: 'delete success'
            })
        ])
        .catch(next)
    }
}

module.exports = AnswerController