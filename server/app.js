if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const routes = require('./routes/index')
const errorHandler = require('./helpers/errorhandler')

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true })
  .then(data => {
    console.log('Connected to MongoDB database')
  }).catch(err => {
    console.log('Could not connected to MongoDB database', err)
  })

app.use('/', routes)

app.use(errorHandler)

module.exports = app
