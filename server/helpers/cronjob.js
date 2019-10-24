const User = require('../models/user');
const cron = require('node-cron');
const sendMail = require('./sendMail')


cron.schedule("* 5 5 5 * *", function() {
  User.find()
    .then(users => {
      users.forEach((el, i) => {
        console.log('Send Schedule Mail');
        sendMail(
          el.email,
          'Thankyou for Trusting Hacktiv Overflow, please verify your account with reply this email "verify".. u can Register VIP member :)')
      })
    })
})

module.exports = cron;