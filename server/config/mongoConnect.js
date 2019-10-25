const mongoose = require('mongoose')
const uri = process.env.MONGO_URI

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true})
  .then(()=> console.log('connected to the database'))
  .catch(()=> console.log('failed to connect to database'))

module.exports = mongoose;