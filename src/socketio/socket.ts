import SocketIO from 'socket.io'
import { Player, PlayerList } from '../model/player'
import { RoomList } from '../model/room'

export function createSocketEvent (io: SocketIO.Server) {
  io.on('connection', (socket: SocketIO.Socket) => {
    console.log('Client connected')
    const player: Player = PlayerList.addPlayer(socket)

    socket.on('disconnect', () => {
      player.endGame()
      console.log('Client disconnected')
    })
  })
}
