import http from 'http'
import Koa from 'koa'
import socketIO from 'socket.io'
import { PORT } from './constants'
import { createSocketEvent } from './socketio/socket'

const app = new Koa()

const server = http.createServer(app.callback())
const io = socketIO(server)

createSocketEvent(io)

server.listen(PORT, () => {
  console.log('Server is listening to port ' + PORT)
})
