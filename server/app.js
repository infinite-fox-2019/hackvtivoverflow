if(process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const index= require('./routes/index.js');
const errorH = require('./middlewares/errorHandler');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const cron = require('./helpers/cronjob')
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, 
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
  })
   .then(() => {
     console.log('Mongoose is successfully connected')
   })
   .catch(console.log)

app.use('/',index);
app.use(errorH)


// app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))


io.on('connection', function(socket){

  socket.on('send-message', function (data) {
    io.emit('send-message', data)
  })
});

http.listen(PORT, cron, function(){
  console.log('listening on *:3000');
});


// module.exports = {
//   io
// }