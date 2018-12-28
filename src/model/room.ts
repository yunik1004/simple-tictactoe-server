import { isUndefined } from 'util'
import { Player } from './player'

export class Room {
  static numRoom: number = 0

  readonly id: number
  readonly name: string
  private players: Array<Player>

  constructor (name: string) {
    this.id = Room.numRoom++
    this.name = name
    this.players = new Array(0)
  }

  numPlayers (): number {
    return this.players.length
  }

  join (player: Player): boolean {
    if (!isUndefined(this.players.find(x => x.id === player.id))) {
      return false
    }

    this.players.push(player)
    return true
  }
}

export namespace RoomList {
  const RoomList: Array<Room> = new Array(0)

  export function getRoom (id: number): Room | null {
    const room = RoomList.find(x => x.id === id)
    if (isUndefined(room)) {
      return null
    }
    return room
  }

  export function getRooms (): Array<Room> {
    return RoomList
  }

  export function addRoom (name: string): Room {
    const room = new Room(name)
    RoomList.push(room)
    return room
  }
}
