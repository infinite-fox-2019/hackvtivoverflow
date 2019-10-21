const NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === 'development' || NODE_ENV === 'test') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const db = (!NODE_ENV) || (NODE_ENV === 'production') ? process.env.MONGO_DB : 'mongodb://localhost/Underflow-' + NODE_ENV


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('./public'))

app.use(cors())

mongoose.connect(db, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("Connected to " + db))
    .catch(console.error)

app.use('/', routes)

app.use(errorHandler)

module.exports = app