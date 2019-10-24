const axios = require('axios')

const token = localStorage.getItem('access_token')

module.exports = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {'access_token': token}
});