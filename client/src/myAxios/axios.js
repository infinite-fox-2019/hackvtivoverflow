// const axios = require('axios')

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

export default instance
// module.exports = instance
