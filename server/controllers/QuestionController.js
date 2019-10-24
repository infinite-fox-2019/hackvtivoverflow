const Question = require("../models/Question")
const Answer = require("../models/Answer")

class QuestionController {
    static create (req, res, next) {
        let { title, description, tags } = req.body
        let UserId = req.loggedUser.id
        Question.create({
            title,
            description,
            tags,
            UserId,
            upVotes: [],
            downVotes: []
        })
        .then ( (result) => {
            res.status(201).json(result)
        })
        .catch (next)
    }

    static findAllQuestion (req, res, next) {
        let arrTemp
        Question.find()
        .populate('UserId')
        .then (result => {
            // async function tes () {
            //     for (let i = 0; i < result.length; i++) {
            //         console.log('masuk', result[i]._id)
            //         Answer.find({
            //             QuestionId: result[i]._id
            //         })
            //         .then (data => {
            //             console.log(data)
            //             result[i].hasil = data
            //         })
            //     }
            // }
            // arrTemp = result
            // console.log('sebelum return', arrTemp)
            // return tes()
            res.status(200).json(result)
        })
        // .then (data => {
        //     // console.log(data.data)
        //     res.status(200).json(arrTemp)
        // })
        .catch (err => {
            next(err)
        })
    }

    static findAll (req, res, next) {
        Question.find({
            UserId: req.loggedUser.id
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static updateQuestion (req, res, next) {
        let { title, description} = req.body
        let { id } = req.params
        Question.findOneAndUpdate({
            _id : id
        }, {
            title,
            description
        })
        .then ( (result) => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static deleteQuestion (req, res, next) {
        let { id } = req.params
        Question.findOneAndDelete({
            _id: id
        })
        .then ((result) => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static upVotes (req, res, next) {
        let { UserId, _id } = req.body
        Question.findOne({_id})
        .then (result => {
            let temp
            for (let i = 0; i < result.downVotes.length; i++) {
                if (UserId == result.downVotes[i]._id) {
                    result.downVotes.splice(i, 1)
                }
            }
            for (let i = 0; i < result.upVotes.length; i++) {
                if (UserId == result.upVotes[i]._id) {
                    temp = true
                }
            }
            if (!temp) {
                result.upVotes.push({
                    _id: UserId
                })
                return {upVotes: result.upVotes, downVotes: result.downVotes}
            } else {
                let err = new Error ('tidak bisa memilih')
                err.name = 'UnAuthorized'
                next(err)
            }
        })
        .then (data => {
            Question.findByIdAndUpdate({
                _id: _id
            }, {
                upVotes: data.upVotes,
                downVotes: data.downVotes
            })
            .then (() => {
                res.status(200).json({upVotes: data.upVotes, downVotes: data.downVotes})
            })
        })
        .catch (err => {
            next(err)
        })
    }

    static downVotes (req, res, next) {
        let { UserId, _id } = req.body
        console.log(req.body)
        Question.findOne({_id})
            .then (result => {
                let temp
                for (let i = 0; i < result.upVotes.length; i++) {
                    if (UserId == result.upVotes[i]._id) {
                        result.upVotes.splice(i, 1)
                    }
                }
                for (let i = 0; i < result.downVotes.length; i++) {
                    if (UserId == result.downVotes[i]._id) {
                        temp = true
                    }
                }
                if (!temp) {
                    result.downVotes.push({
                        _id: UserId
                    })
                    return {upVotes: result.upVotes, downVotes: result.downVotes}
                } else {
                    let err = new Error ('tidak bisa memilih')
                    err.name = 'UnAuthorized'
                    next(err)
                }
            })
            .then (data => {
                Question.findByIdAndUpdate({
                    _id: _id
                }, {
                    upVotes: data.upVotes,
                    downVotes: data.downVotes
                })
                .then (() => {
                    res.status(200).json({upVotes: data.upVotes, downVotes: data.downVotes})
                })
            })
            .catch (err => {
                next(err)
            })
    }

    static findOne (req, res, next) {
        let { id } = req.params
        console.log(id)
        let temp
        Question.findOne({
            _id: id
        })
        .populate('UserId')
        .then (result => {
            console.log(result)
            temp = result
            return Answer.find({
                QuestionId: id
            }).populate('UserId')
        })
        .then (result => {
            console.log(temp.UserId.name)
            res.status(200).json({
                _id: temp._id,
                UserId: temp.UserId,
                title: temp.title,
                description: temp.description,
                hasil: result,
                upVotes: temp.upVotes,
                downVotes: temp.downVotes
            })
        })
        .catch (err => {
            next(err)
        })
    }
}

module.exports = QuestionController