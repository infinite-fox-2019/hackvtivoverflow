const http = require('http')
const app = require('../app')
const server = http.createServer(app)

server.listen(process.env.PORT, (_) => console.log('server running on port ' + process.env.PORT))