const Route = require('express').Router();
const { findOneUserforState,getByContribution,login,register,viewUserProfile, updateMedal, addToWatchTag } = require('../controllers/userController');
const { authentication } = require('../middlewares/auth');

Route.get('/', authentication, findOneUserforState);
Route.get('/contribution', getByContribution); // *
Route.get('/:id', authentication, viewUserProfile);
Route.patch('/add/watch', authentication, addToWatchTag);
// Route.patch('/medal/:id', authentication, updateMedal); //tidak jadi
Route.post('/login', login);
Route.post('/register', register);

module.exports = Route;
