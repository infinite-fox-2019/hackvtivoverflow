const Tag = require('../models/Tag')
const Question = require('../models/Question')

class TagController {

    static find(req, res, next){
        Tag.find().sort({ createdAt: -1 })
            .then(tag =>{
                res.status(200).json(tags)
            })
            .catch(next)
    }

    static findByName(req, res,next){
        let questions = null
        Tag.find().sort({ createdAt: -1 })
        Question.find({
                        tags: {
                            $regex: `${keyword}`,
                            $options: 'i'
                        }
            }).populate('userId', 'email').sort({ updatedAt: -1 })
                .then(result => {
                    questions = result
                    return Tag.findOne({ name })
                })
                .then(tag =>{
                    res.status(200).json({ tag, questions })
                })
                .catch(next) 
    }

}