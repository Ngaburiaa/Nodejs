const logevent=require("./LogEvent")


const http = require('http')
const EventEmitter = require('events')

const eventLog = new EventEmitter()

const server = http.createServer((req, res) => {
    eventLog.emit('request', req , res)
})

eventLog.on('request', (req, res) => {
    res.writeHead(2000, {'Content-Type': 'text/plain'})
    res.end(logevent())
})

server.listen(3000, () => {
    console.log(`server running at port: 3000`)
})