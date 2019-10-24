'use strict'

const CronJob = require('cron').CronJob

// Test CRON
function cron () {
  new CronJob('*/2 * * * * *', function () {
    console.log('You will see this message every two second')
  }, null, true, 'Asia/Jakarta')
}

module.exports = cron
