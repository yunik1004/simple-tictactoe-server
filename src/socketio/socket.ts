import SocketIO from 'socket.io'
import { Player, PlayerList } from '../model/player'

export function createSocketEvent (io: SocketIO.Server) {
  io.on('connection', (socket: SocketIO.Socket) => {
    const player: Player = PlayerList.addPlayer(socket)
    console.log('Client connected: ' + player.getID())

    socket.on('disconnect', () => {
      PlayerList.removePlayer(player)
      console.log('Client disconnected: ' + player.getID())
    })
  })
}
