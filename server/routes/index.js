const router = require('express').Router()
const userRoute = require('./userRoute')
const questionRoute = require('./questionRoute')
const answerRoute = require('./answerRoute')

const User = require('../models/User')
const MailConfig = require('../configs/sendEmail');
const hbs = require('nodemailer-express-handlebars');
const gmailTransport = MailConfig.GmailTransport;
const smtpTransport = MailConfig.SMTPTransport;

var CronJob = require('cron').CronJob;
new CronJob(' 0 0 1 1 *', function () {
    User.find()
        .then(users => {
            users.forEach(user => {
                MailConfig.ViewOption(gmailTransport, hbs);
                let HelperOptions = {
                    from: '"Uzai Sindiko" <uzai.sindiko@gmail.com>',
                    to: `${user.email}`,
                    subject: 'Kirim Email',
                    template: 'test',
                    context: {
                        name: `${user.name}`,
                        email: `${user.email}`
                    }
                };
                gmailTransport.sendMail(HelperOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    }
                    console.log("email is send");
                    console.log(info);
                });
            })
        })

}, null, true, 'Asia/Jakarta');

router.use('/users', userRoute)
router.use('/questions', questionRoute)
router.use('/answers', answerRoute)


module.exports = router