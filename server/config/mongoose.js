'use strict'

const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

module.exports = () => {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB database')
    }).catch((err) => {
      console.log(err, 'Could not connected to MongoDB database')
    })
}
