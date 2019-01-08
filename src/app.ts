import http from 'http'
import Koa from 'koa'
import SocketIO from 'socket.io'
import { createConnectionEvent } from './socketio/socket'

const app = new Koa()

const server = http.createServer(app.callback())
const io = SocketIO(server)

createConnectionEvent(io)

export { server }
