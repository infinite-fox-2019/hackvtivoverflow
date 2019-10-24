import axios from 'axios'

// Development
let server = 'http://localhost:3000'

// Production
// let server = ''

let instance = axios.create({
  baseURL: server
})

export default instance
