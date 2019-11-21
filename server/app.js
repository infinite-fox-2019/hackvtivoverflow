if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const mongoose = require('mongoose')
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const errorhandler = require('./middlewares/errorhandler')
const CronJob = require('cron').CronJob;
const axios = require('axios')

const server = require('http').Server(app)
const io = require('socket.io')(server)


// mongoose.connect('mongodb://localhost:27017/hackOverflow', {useNewUrlParser: true,useUnifiedTopology:true});
mongoose.connect(process.env.MONGO_ATLAS,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(()=>{
    console.log('connectedOnAtlas')
  })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));





app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(cors());
app.use("/", routes);


io.on('connection', function (socket) {
  new CronJob('*/5 * * * * *', function() {
    let num = Math.floor(Math.random()*100)
    axios({
      method : 'get',
      url : `http://numbersapi.com/${num}` 
    })
      .then((string)=>{
        // console.log(string.data)
        socket.emit('getNews', string.data)
      })
      .catch((err)=>{
        console.log(err);
      })
    // console.log('You will see this message every second');
  }, null, true, 'Asia/Jakarta');
});



app.use(errorhandler)

// app.listen(PORT, () => {
//   console.log(`listening on ` + PORT);
// });


server.listen(PORT,()=>{
  console.log(`listening on ${PORT}`);
})


