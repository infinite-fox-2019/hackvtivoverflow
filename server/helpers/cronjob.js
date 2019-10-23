var CronJob = require('cron').CronJob
const User = require('../models/user')
var nodemailer = require('nodemailer')
// let time = '* * * * *' // 1 minute
let time = '0 20 * * 5'

function cron (){
  new CronJob(time, function() {
      console.log('masuk')
    User.find({})
    .then(users => {
      users.forEach(dataUser => {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: `${process.env.email}`, // generated ethereal user
            pass: `${process.env.emailpass}` // generated ethereal password
          }
        });
          
        var mailOptions = {
          from: `${process.env.email}`,
          to: `${dataUser.email}`,
          subject: 'Coder Fairy',
          text: `Halo ${dataUser.name}, I am from Code Red. Happy Friday Night!, Hope your weekend GREAT`
        }
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error.message)
          } else {
            console.log(info.response)
          }
        })

      })
    })
    .catch(err => {
      console.log('Cron Job Failed to get users!')
    })
  }, null, true, 'Asia/Jakarta')
}

module.exports = cron