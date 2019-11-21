const Route = require('express').Router();
const Question = require('./questionRoute');
const User = require('./userRoute');
const Answer = require('./answerRoute');
const Msg = require('./msgRoute');

Route.use('/messages', Msg);
Route.use('/users',User);
Route.use('/questions',Question);
Route.use('/answers',Answer);

module.exports = Route;