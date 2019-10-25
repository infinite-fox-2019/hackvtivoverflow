if(process.env.NODE_ENV === "development"){
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./routers')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
  console.log('Database Connected')
})

app.use(router)

app.use(errorHandler)
app.listen(port, () => {
  console.log('App listen on port'+port)
})