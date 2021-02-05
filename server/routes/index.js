var MailConfig = require('../config/email');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;


const router = require('express').Router()
const userRoute = require('./userRoute')
const questionRoute = require('./questionRoute')
const answerRoute = require('./answerRoute')
const User = require('../models/user')

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome to Qmarks' })
})



var CronJob = require('cron').CronJob;
new CronJob('0 0 0 1 * *', function () {
  console.log('mashok')
  User.find()
    .then(users => {
      users.forEach(user => {
        MailConfig.ViewOption(gmailTransport, hbs);
        let HelperOptions = {
          from: '"Rizky Ichsandi" <rizkyich13@gmail.com>',
          to: `${user.email}`,
          subject: 'Qmarks',
          template: 'test',
          context: {
            name: `${user.username}`,
            email: `${user.email}`
          }
        };
        gmailTransport.sendMail(HelperOptions, (error, info) => {
          if (error) {
            console.log(error);
            res.json(error);
          }
          console.log("email is send");
          console.log(info);
          res.json(info)
        });
      })
    })


}, null, true, 'America/Los_Angeles');

router.use('/users', userRoute)
router.use('/questions', questionRoute)
router.use('/answers', answerRoute)

module.exports = router