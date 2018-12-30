import SocketIO from 'socket.io'
import { Player, PlayerList } from '../model/player'

export function createSocketEvent (io: SocketIO.Server) {
  io.on('connection', (socket: SocketIO.Socket) => {
    console.log('Client connected')
    const player: Player = PlayerList.addPlayer(socket)

    socket.on('disconnect', () => {
      PlayerList.removePlayer(player)
      console.log('Client disconnected')
    })
  })
}
