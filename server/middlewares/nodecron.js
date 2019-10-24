const nodemailer = require('../helpers/nodemailer')
const User = require('../models/user')
const Question = require('../models/question')
const CronJob = require('cron').CronJob

function questionDailyContent(data){
  let questions = ''
  for(let i in data){
    let description = data[i].description
    if(description.length > 140) description = description.substring(0,10) + '...'
    
    let question =  `
      <a href="http://api.flowover.mardii.site/question/${data[i]._id}">
        <h2>${data[i].title}</h2>
        <p>${description}</p>
      </a>    
    `
    questions += question
  }
  let content = `
  <h1>Help Others and Build your Reputation</h1>
  <div class="question--list">
    ${ questions }
  </div>
  <footer>
    <p>&copy; FlowOver</p>
  </footer>`
  return content;
}

module.exports = {
  questionDaily () { 
  console.log('cron...')  
   new CronJob('0 41 13 * * *', function() {
      console.log('Cron job is doing its job ...')

      let dt = new Date()
      dt.setDate( dt.getDate() - 1 )
      
      let mailData
      
      User
        .find()
        .then(data => {
          mailData = data
          return Question
          .find({'createdAt': { $gte: dt }, answers: { $size: 0 }})
        })
        .then(data => {
          let content = questionDailyContent(data)
          let title = "Your Daily Digest - FlowOver"
          let mails = mailData.map(el => el.email)
          nodemailer.sendMail(title, mails, content)
        })
        .catch(err => console.log(err))
    }, null, true, 'Asia/Jakarta');
  }
}
