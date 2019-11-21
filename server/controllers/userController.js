const User = require('../models/user');
const { comparePassword } = require('../helpers/hash');
const { signToken } =require('../helpers/jwt');
const Question = require('../models/questions');
const Answer = require('../models/answer');

module.exports = {
  findOneUserforState (req,res,next) {
    User.findById(req.loggedUser.id)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  },
  viewUserProfile (req, res, next) {
    console.log(req.params.id)
    let tempUser
    let tempQuestion
    let tempNewUpdateUser
    User.findById(req.params.id)
      .then(user => {
        console.log(user)
        if(!user) throw {msg: 'not found'}
        else {
          tempUser = user;
          return Question.find({ UserId: req.params.id }).populate('UserId')
        }
      })
      .then(question => {
        tempQuestion = question
        const newView = Number(tempUser.views) + 1
        return User.findByIdAndUpdate(req.params.id, { views: newView }, {new: true})
      })
      .then(user => {
        tempNewUpdateUser = user;
        return Answer.find({ UserId: req.params.id })
      })
      .then(answer => {
        res.status(200).json({user: tempNewUpdateUser, question: tempQuestion, answer})
      })
      .catch(next)
  },
  // updateMedal (req, res, next) { //tidak jadi
  //   const id = req.params.id
  //   const medal = req.body.medal;
  //   let pass = true
  //   if(medal == 'gold') {
  //     User.findById(id)
  //       .then(user => {
  //         user.gold.forEach((el, i) => {
  //           if(el == req.loggedUser.id){
  //             pass = false;
  //           }
  //         })
  //         if(!pass) return User.findByIdAndUpdate(id, {$pull: {gold: req.loggedUser.id}}, {new: true})
  //         else return User.findByIdAndUpdate(id, {$push: {gold: req.loggedUser.id}}, {new: true})
  //       })
  //       .then(user => {
  //         res.status(200).json({user})
  //       })
  //       .catch(next)
  //   }else if(medal == 'silver') {
  //     User.findById(id)
  //       .then(user => {
  //         user.silver.forEach((el, i) => {
  //           if(el == req.loggedUser.id){
  //             pass = false;
  //           }
  //         })
  //         if(!pass) return User.findByIdAndUpdate(id, {$pull: {silver: req.loggedUser.id}}, {new: true})
  //         else return User.findByIdAndUpdate(id, {$push: {silver: req.loggedUser.id}}, {new: true})
  //       })
  //       .then(user => {
  //         res.status(200).json({user})
  //       })
  //       .catch(next)
  //   } else if(medal == 'bronze') {
  //     User.findById(id)
  //       .then(user => {
  //         user.bronze.forEach((el, i) => {
  //           if(el == req.loggedUser.id){
  //             pass = false;
  //           }
  //         })
  //         if(!pass) return User.findByIdAndUpdate(id, {$pull: {bronze: req.loggedUser.id}}, {new: true})
  //         else return User.findByIdAndUpdate(id, {$push: {bronze: req.loggedUser.id}}, {new: true})
  //       })
  //       .then(user => {
  //         res.status(200).json({user})
  //       })
  //       .catch(next)
  //   }
  // },
  login (req,res,next) {
    const { request, password } = req.body;
    if(request && password) {
      User.findOne({ $or: [{username: request}, {email: request}] })
        .then(user => {
          if(user && comparePassword(password, user.password)){
            const payload = {
              id: user._id,
              username: user.username,
              email: user.email
            };
            const serverToken = signToken(payload);
            res.status(200).json({ token: serverToken, user })
          } else {
            throw { status: 403, msg: 'wrong' }
          }
        })
        .catch(next)
    }else{
      throw { status: 404, msg: 'annon' }
    }
  },
  register (req,res,next) {
    console.log(req.body)
    const { username, password, email, city } = req.body;
    User.create({ username, password, email, city })
      .then(user => {
        const payload = { 
          id: user._id,
          username: user.username,
          email: user.email
        };
        const serverToken = signToken(payload);
        res.status(201).json({ token: serverToken, msg: 'Success Register', user })
      })
      .catch(next)
  },
  addToWatchTag (req, res, next) {
    const nameTag = req.body.tag;
    User.findById(req.loggedUser.id)
      .then(user => {
        let pass = true;
        user.watchTag.forEach((el, i) => {
          if(el == nameTag) pass = false
        })
        if(!pass) return User.findByIdAndUpdate(req.loggedUser.id, {$pull: {watchTag: nameTag}}, {new: true})
        else return User.findByIdAndUpdate(req.loggedUser.id, { $push: {watchTag: nameTag}}, {new: true})
      })
      .then(user => {
        res.status(200).json({msg: 'success update', user})
      })
      .catch(next)
  },
  getByContribution (req, res, next) {
    User.find().sort([['point', 1]])
      .then(users => {
        res.status(200).json({users})
      })
      .catch(next)
  }
}