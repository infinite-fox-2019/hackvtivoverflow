const Msg = require('../models/msg');
const cron = require('node-cron');


cron.schedule("0 0 0 1 * *", function() {
  Msg.deleteMany()
    .then(() => {
      console.log('success delete all message')
    })
    .catch(console.log)
})

module.exports = cron;