import http from 'http'
import Koa from 'koa'
import { PORT } from './constants'

const app = new Koa()

const server = http.createServer(app.callback())
const io = require('socket.io')(server)

app.listen(PORT, () => {
  console.log('Server is listening to port ' + PORT)
})
