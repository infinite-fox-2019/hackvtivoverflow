const Tag = require('../models/tag')
class TagController {
    static getAll(req, res, next){
        Tag.find({})
        .then(data =>{
            res.status(200).json({tags: data})
        })
        .catch(next)
    }
    static getOne(req, res, next){
        Tag.findOne({name : req.params.tag})
        .populate({
            path: "questions",
            model: "Question",
            populate : {
                path : "user",
                model : "User",
                select: "name"
            }
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = TagController