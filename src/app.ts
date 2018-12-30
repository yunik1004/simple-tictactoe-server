import http from 'http'
import Koa from 'koa'
import SocketIO from 'socket.io'
import { PORT } from './constants'
import { createConnectionEvent } from './socketio/socket'

const app = new Koa()

const server = http.createServer(app.callback())
const io = SocketIO(server)

createConnectionEvent(io)

server.listen(PORT, () => {
  console.log('Server is listening to port ' + PORT)
})
