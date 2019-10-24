import axios from 'axios'

// Development
// let server = 'http://localhost:3000'

// Production
let server = 'http://api.flowover.mardii.site'

let instance = axios.create({
  baseURL: server
})

export default instance
