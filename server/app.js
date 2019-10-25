if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'  ) {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const uri =  process.env.ATLAS_CONNECT 

console.log(uri);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`success connect to mongoodb `);
    })
    .catch(() => {
        console.log(`fail connect to mongoodb`);
    })

app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`success to connect to`, PORT);
})

module.exports = app