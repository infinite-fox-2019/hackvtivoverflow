const User = require('../models/user');
const cron = require('node-cron');
const sendMail = require('./sendMail')

User.find()
  .then(users => {
    users.forEach((el, i) => {
      cron.schedule("* * * 10 * *", function() {
        console.log(`Send Schedule Mail`);
        sendMail(
          'ericsudhartio25@gmail.com',
          'Thankyou for Trusting Hacktiv Overflow, please verify your account with reply this email "verify".. u can Register VIP member :)')
      })
    })
  })
  .catch(err => {
    console.log(err)
  })

cron.schedule("* 5 5 5 * *", function() {
  User.find()
    .then(users => {
      users.forEach((el, i) => {
        console.log('Send Schedule Mail');
        sendçMail(
          el.email,
          'Thankyou for Trusting Hacktiv Overflow, please verify your account with reply this email "verify".. u can Register VIP member :)')
      })
    })
})

module.exports = cron;