if (process.env.NODE_ENV==='development') {
  require('dotenv').config()
}

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const { errorHandler } = require('./middlewares/errorHandler')
const app = express()
mongoose
  .connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((_) => console.log('database mongoose connected'))
  .catch((_) => console.log('cant connect to database'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())
app.use('/', routes)
app.use(errorHandler)

module.exports = app