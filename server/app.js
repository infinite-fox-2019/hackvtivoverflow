// DOTENV VARIABLE
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

// STATE VARIABLES
const express = require('express')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')
const cors = require('cors')
const PORT = process.env.PORT
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http);
const CronJob = require("cron").CronJob
//CONNECTION
mongoose.connect(process.env.MONGOOSE_URL,
        { useNewUrlParser: true,
        useUnifiedTopology: true },
        (err => {
            err ? console.log(err) : console.log('connected to mongoose')
        }))

// MIDDLE WARES
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

// SOCKET
// io.on('connection', function(socket){
  const job = new CronJob('* * * * * *', function() {
    const checkDigit = (value) => {
      if (value < 10) {
          return "0" + value
      } else {
          return value
      }
    }
    const now = new Date()
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const time = `${checkDigit(hours)} : ${checkDigit(minutes)} : ${checkDigit(seconds)}`
    io.emit('Show Time', time);
  });
  job.start()
// });

//ROUTE
app.use('/', routes)


//ERROR HANDLER MIDDLEWARE
app.use(errorHandler)

http.listen(PORT, () => console.log(`listening at port ${PORT}`))