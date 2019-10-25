if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}


const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = 3000
mongoose.connect(process.env.URL_MONGOOSE,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true })
.then (_=>{
    console.log('mongoose succeessfully connect')
})
.catch(console.log)

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',routes)
app.use(errorHandler)

app.listen(PORT,_=>{console.log(`listening on port ${PORT}`)})
