const CronJob = require('cron').CronJob
const question = require('../models/question')
const votes = require('../models/vote')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(data => {
    console.log('Connected to MongoDB database')
  }).catch(err => {
    console.log('Could not connected to MongoDB database', err)
  })

new CronJob('0 0 * * 0', function () {
  question.find().populate('UserId')
    .then(data => {
      const top10 = []
      for (let i = 0; i < data.length; i++) {
        const topData = {}
        topData.question = data[i].pertanyaan
        topData.vote = data[i].upvote.length - data[i].downvote.length
        topData.User = data[i].UserId.name
        top10.push(topData)
      }
      const top10Ku = top10.sort((a, b) => {
        return b.vote - a.vote
      })
      const top3 = top10Ku.splice(0, 3)
      const id = '5d6759e47b8e8532fb2d7d16'
      return votes.findByIdAndUpdate(id, {
        $set: {
          topvotes: []
        }
      }, {
        new: true,
        runValidators: true
      })
        .then(data2 => {
          return votes.findByIdAndUpdate(id, {
            $addToSet: {
              topvotes: {
                $each: top3
              }
            }
          }, {
            new: true,
            runValidators: true
          })
            .then(response => {
              res.status(200).json(response)
            })
        })
    }).catch(err => {
      console.log(err)
    })
}, null, true, 'Asia/Jakarta')

module.exports = router
