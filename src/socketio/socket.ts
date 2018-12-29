import socketIO from 'socket.io'

export function createSocketEvent (io: socketIO.Server) {
  io.on('connection', (socket: socketIO.Socket) => {
    console.log('Client connected')

    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })
  })
}
