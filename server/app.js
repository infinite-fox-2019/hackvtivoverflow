if(process.env.NODE_ENV == 'development'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const index= require('./routes/index.js');
const errorH = require('./middlewares/errorHandler');

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true})
   .then(() => {
       console.log('Mongoose is successfully connected')
   })
   .catch(console.log)

app.use('/',index);
app.use(errorH)

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
