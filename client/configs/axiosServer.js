const axios = require('axios')

const token = localStorage.getItem('access_token')

module.exports = axios.create({
  baseURL: 'http://18.216.24.207/',
  headers: {'access_token': token}
});