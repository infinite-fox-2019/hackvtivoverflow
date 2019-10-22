const Route = require('express').Router();
const Question = require('./questionRoute');
const User = require('./userRoute');
const Answer = require('./answerRoute');

Route.use('/users',User);
Route.use('/questions',Question);
Route.use('/answers',Answer);

module.exports = Route;