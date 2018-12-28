import socketIO from 'socket.io'

export function createSocket (io: socketIO.Server) {
  io.on('connection', (socket: socketIO.Socket) => {
    console.log('Connected')
  })
}
