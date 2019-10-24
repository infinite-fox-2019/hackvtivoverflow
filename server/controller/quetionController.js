const Question = require('../models/Question')
const Answer = require('../models/Answer')


class QuestionController {

    static create(req, res, next){
        let { title, description, tags } = req.body
        let userId = req.decode.id
            Question.create({ title, description, tags, userId })
            .then(question =>{
                res.status(201).json(question)
            })
            .catch(next)
    }

    static find(req, res, next){
        Question.find().populate('userId', 'email').sort({ updatedAt: -1 })
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(next)
    }

    static findByUser(req, res, next){
        const userId = req.decode.id
        Question.find({ userId }).populate('userId', 'email').sort({ updatedAt: -1 })
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)
    }

    static findByTag(req, res, next){
        const { keyword } = req.query       
            Question.find({
                        tags: {
                            $regex: `${keyword}`,
                            $options: 'i'
                        }
            }).populate('userId', 'email').sort({ updatedAt: -1 })
                .then(questions => {
                    res.status(200).json(questions)
                })
                .catch(next)
    }

    static findById(req ,res, next){
        const questionId = req.params.id
        Question.findById(questionId).populate('userId', 'email').sort({ updatedAt: -1 })
            .then(question =>{
                res.status(200).json(question)
            })
            .catch(next)
    }

    static search(req, res, next) {
        const { keyword } = req.query       
            Question.find({
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
                    },
                    {
                        tags: {
                            $regex: `${keyword}`,
                            $options: 'i'
                        }
                    }
                ]
            }).populate('userId', 'email').sort({ updatedAt: -1 })
                .then(questions => {
                    res.status(200).json(questions)
                })
                .catch(next)
    }

    static update(req, res, next){
        let questionId = req.params.id
        let { title, description, tags, votes } = req.body

        Question.findByIdAndUpdate(questionId, { title, description, tags, votes }, { omitUndefined: true })
            .then(question =>[
                res.status(200).json(question)
            ])
            .catch(next)
    }

    static delete(req, res, next){
        let questionId = req.params.id
        Answer.deleteMany({ questionId })
        .then(()=>{
            return Question.findByIdAndDelete(questionId)
        })
        .then(() =>[
            res.status(200).json({
                message: 'delete success'
            })
        ])
        .catch(next)
    }

    static upvote(req, res, next) {
        const userId = req.decode.id
        const id = req.params.id

        Question.findById(id)
          .then(question => {
            if (question) {
              let downvotes = question.downvotes.indexOf(userId)
              let upvotes = question.upvotes.indexOf(userId)    
              if (downvotes > -1)  question.downvotes.splice(downvotes, 1)
              if (upvotes > -1)  question.upvotes.splice(upvotes, 1)
              else question.upvotes.push(userId)
              return question.save()
            }
          })
          .then((question) => {
            res.status(200).json({ 
                message: 'success upvote', question
            })
          })
          .catch(next)
      }
    
      static downvote(req, res, next) {
        const userId = req.decode.id
        const id = req.params.id
    
        Question.findById(id)
          .then(question => {
            if (question) {
              let downvotes = question.downvotes.indexOf(userId)
              let upvotes = question.upvotes.indexOf(userId)

              if (upvotes > -1)  question.upvotes.splice(upvotes, 1)
              if (downvotes > -1) question.downvotes.splice(downvotes, 1)
              else question.downvotes.push(userId)  
              return question.save()
            }
          })
          .then((question) => {
            res.status(200).json({ 
                message: 'success downvote', question
            })
          })
          .catch(next)
      }

}

module.exports = QuestionController