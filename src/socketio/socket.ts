import SocketIO from 'socket.io'
import { Player, PlayerList } from '../model/player'

export function createConnectionEvent (io: SocketIO.Server) {
  io.on('connection', (socket: SocketIO.Socket) => {
    const player: Player = PlayerList.addPlayer(socket)

    socket.on('disconnect', () => {
      PlayerList.removePlayer(player)
    })
  })
}
