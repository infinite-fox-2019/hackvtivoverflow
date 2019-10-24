const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'hosea.boyer@ethereal.email',
      pass: 't1BQBdbTpKxCA3wzWs'
  }
});

module.exports = {
  sendMail (title, mails, content) {
    let mailPromises = []
    for (let i in mails) {
      let newPromise = new Promise ((resolve, reject) => {
        transporter.sendMail({
          from: 'hosea.boyer@ethereal.email', // sender address
          to: mails[i],
          subject: title,
          text: '',
          html: content
        })
        .then(info => {
          resolve(info)
        })
        .catch(err => {
          reject(err)
        })
      })
      mailPromises.push(newPromise)
    }
    Promise.all(mailPromises)
    .then(result => {
      console.log(result, '====================RESULT=================')
    })
    .catch(err => {
      // console.log(err)
    })
  }
}
