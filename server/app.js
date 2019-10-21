if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const routers = require('./routers')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

mongoose.connect(process.env.MONGOOSE_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
  if(err) {
    console.log('connection failed')
  } else {
    console.log('database connected')
  }
})

app.use(routers)

app.use(errorHandler)

app.listen(PORT, () => console.log(`listening on port ${PORT}`))