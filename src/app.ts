import http from 'http'
import Koa from 'koa'
import SocketIO from 'socket.io'
import { PORT } from './constants'
import { createSocketEvent } from './socketio/socket'

const app = new Koa()

const server = http.createServer(app.callback())
const io = SocketIO(server)

createSocketEvent(io)

server.listen(PORT, () => {
  console.log('Server is listening to port ' + PORT)
})
