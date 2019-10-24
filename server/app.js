if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express');
const app = express()
const PORT = process.env.PORT
const cors = require('cors')
//router----
const userRouter = require('./routes/userRouter')
const questionRouter = require('./routes/questionRouter')
const answersRouter = require('./routes/answerRouter')
//mongoose Connection////
const mongoose  = require('mongoose')
mongoose.connect('mongodb://localhost/hackOverflow', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('We are connected to mongoose')
});
////////////////////////
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(express.json())

app.use('/users', userRouter)
app.use('/questions', questionRouter)
app.use('/answers', answersRouter)




app.listen(PORT, () => console.log('Server running on ' + PORT))