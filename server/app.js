require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT ||  3000

const cors = require('cors')
const mongoose = require('mongoose')
const index = require('./routes')
const errHandler = require('./middlewares/errHandler')
const morgan = require('morgan')
const cron = require('./helpers/cronjob')
const database = 'mongodb://localhost:27017/codered'
// const dbatlas = 'mongodb+srv://ayusudi:ayusudi@cluster0-acddn.mongodb.net/codered?retryWrites=true&w=majority'

app.use(cors())
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended : false}))


mongoose.connect(database, {
  useNewUrlParser : true , useUnifiedTopology: true , useFindAndModify :false
}, function(err){
  if(err) {
    console.log(err)
    console.log(`server isn't connect to mongodb`);
  }
  else {
    console.log('Connected!');
  }
})

app.use('/', index)
app.use(errHandler)

// cron()

app.listen(PORT, function(){
  console.log(`Hello from port ${PORT}`);
})
