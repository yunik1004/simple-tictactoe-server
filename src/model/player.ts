import SocketIO from 'socket.io'
import { sprintf } from 'sprintf-js'
import { Mark } from './play'
import { Room, RoomList } from './room'

export class Player {
  private socket: SocketIO.Socket
  private name: string
  private room: Room | null

  constructor (socket: SocketIO.Socket) {
    this.socket = socket
    this.name = this.socket.id
    this.room = null

    /* Join lobby */
    this.changeRoom(RoomList.getLobby())

    /* Socket event handler */
    this.socket.on('changePlayerName', (name: string) => {
      this.name = name
    })

    this.socket.on('createRoom', (name: string) => {
      if (this.room === null || !this.room.isLobby()) {
        this.socket.emit('createRoomFail')
        return
      }

      const room: Room = RoomList.addRoom(name)
      if (!this.changeRoom(room)) {
        this.socket.emit('createRoomFail')
        return
      }
      this.socket.emit('createRoomSuccess', room.id)
    })

    this.socket.on('joinRoom', (id: string) => {
      const room = RoomList.getRoom(id)

      // If fail to change room, then alert to client
      if (this.room === null || !this.room.isLobby() || room === null || !this.changeRoom(room)) {
        this.socket.emit('joinRoomFail')
        return
      }
      this.socket.emit('joinRoomSuccess')
    })

    this.socket.on('leaveRoom', () => {
      if (this.room === null || this.room.isLobby() || !this.changeRoom(RoomList.getLobby())) {
        this.socket.emit('leaveRoomFail')
        return
      }
      this.socket.emit('leaveRoomSuccess')
    })

    this.socket.on('getRoomList', () => {
      this.socket.emit('getRoomListSuccess', RoomList.getRoomsJSONWithoutLobby())
    })

    this.socket.on('getPlayerList', () => {
      if (this.room === null) {
        this.socket.emit('getPlayerListFail')
        return
      }
      this.socket.emit('getPlayerListSuccess', this.room.getPlayersJSON())
    })

    this.socket.on('changeTeam', (team: Mark) => {
      if (this.room === null || this.room.isLobby()) {
        this.socket.emit('changeTeamFail')
        return
      }
      this.room.changeTeam(this, team)
      this.socket.emit('changeTeamSuccess')
    })
  }

  getID (): string {
    return this.socket.id
  }

  getName (): string {
    return this.name
  }

  changeRoom (room: Room | null): boolean {
    if (this.room !== null) {
      this.socket.leave(this.room.getSocketIORoomName())
      this.room.leave(this)
      this.room = null
    }

    if (room !== null) {
      if (!room.join(this)) {
        return false
      }
      this.room = room
      this.socket.join(this.room.getSocketIORoomName())
    }

    return true
  }
}

export namespace PlayerList {
  const PlayerList: Array<Player> = new Array()

  export function getPlayer (id: string): Player | null {
    const player = PlayerList.find(x => x.getID() === id)
    if (player === undefined) {
      return null
    }
    return player
  }

  export function getPlayers (): Array<Player> {
    return PlayerList
  }

  export function addPlayer (socket: SocketIO.Socket): Player {
    const player = new Player(socket)
    PlayerList.push(player)

    console.log(sprintf('Client connected: %s', player.getID()))
    return player
  }

  export function removePlayer (player: Player) {
    player.changeRoom(null)

    const index = PlayerList.findIndex(x => x.getID() === player.getID())
    if (index < 0) {
      return
    }

    PlayerList.splice(index, 1)

    console.log(sprintf('Client disconnected: %s', player.getID()))
  }
}
