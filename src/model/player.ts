import { isUndefined, isNull } from 'util'
import SocketIO from 'socket.io'
import { ROOM_PREFIX } from '../constants'
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
      const room: Room = RoomList.addRoom(name)
      this.changeRoom(room)
    })

    this.socket.on('changeRoom', (id: string) => {
      const room = RoomList.getRoom(id)
      if (isNull(room)) {
        return
      }
      this.changeRoom(room)
    })
  }

  getID (): string {
    return this.socket.id
  }

  changeRoom (room: Room | null) {
    if (!isNull(this.room)) {
      this.socket.leave(ROOM_PREFIX + this.room.id)
      this.room.leave(this)
      this.room = null
    }

    if (!isNull(room)) {
      if (!room.join(this)) {
        return
      }
      this.room = room
      this.socket.join(ROOM_PREFIX + room.id)
    }
  }
}

export namespace PlayerList {
  const PlayerList: Array<Player> = new Array()

  export function getPlayer (id: string): Player | null {
    const player = PlayerList.find(x => x.getID() === id)
    if (isUndefined(player)) {
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
    return player
  }

  export function removePlayer (player: Player) {
    player.changeRoom(null)

    const index = PlayerList.findIndex(x => x.getID() === player.getID())
    if (index < 0) {
      return
    }

    PlayerList.splice(index, 1)
  }
}
