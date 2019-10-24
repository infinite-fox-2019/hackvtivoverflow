if(process.env.NODE_ENV === 'development')require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./router')
const errorHandler = require('./middlewares/errorHandler')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const axios = require('axios')

const server = require('http').Server(app);
const io = require('socket.io')(server);

const cron = require('cron').CronJob;
const fetchQuoteCron = require('./helpers/fetchQuoteCron')


io.on('connection', (socket) => {
    // fetchQuoteCron()
    new cron('*/59 * * * * *', function() {
        axios({
            method: 'get',
            url : 'https://favqs.com/api/qotd'
        })
        .then( ({ data }) => {
            socket.emit('server', { message : data.quote.body})
        })
        .catch( err => {
            console.log(err.response)
        })
      }, null, true, 'America/Los_Angeles');
})


mongoose.connect( process.env.MONGOATLAS , { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex : true } , () => {
    console.log('connect to mongo')
})

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', router)
app.use(errorHandler)

// app.listen(PORT , _ => console.log(`running on port PORT ${PORT}`))

server.listen(PORT , () => {
    console.log('connected to PORT ' , PORT)
});
