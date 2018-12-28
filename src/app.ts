import http from 'http'
import Koa from 'koa'
import socketIO from 'socket.io'
import { PORT } from './constants'
import { createSocket } from './socketio/socket'

const app = new Koa()

const server = http.createServer(app.callback())
const io = socketIO(server)

createSocket(io)

app.listen(PORT, () => {
  console.log('Server is listening to port ' + PORT)
})
