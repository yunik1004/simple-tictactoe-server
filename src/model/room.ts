import { isUndefined } from 'util'
import shortid from 'shortid'
import { sprintf } from 'sprintf-js'
import { LOBBY, ROOM_PREFIX } from '../constants'
import { Board, BoardPosition, Mark } from './play'
import { Player } from './player'

type PlayerWithTeam = {
  player: Player,
  team: Mark
}

export class Room {
  readonly id: string
  readonly name: string
  private players: Array<PlayerWithTeam>
  private board: Board

  constructor (name: string) {
    this.id = shortid.generate()
    this.name = name
    this.players = new Array()
    this.board = new Board()
    console.log(sprintf('Room created: %s (%s)', this.id, this.name))
  }

  numPlayers (): number {
    return this.players.length
  }

  getSocketIORoomName (): string {
    return ROOM_PREFIX + this.id
  }

  /* Should be called from player */
  join (player: Player): boolean {
    if (!isUndefined(this.players.find(x => x.player.getID() === player.getID()))) {
      return false
    }

    this.players.push({ player: player, team: Mark.Empty })
    return true
  }

  /* Should be called from player */
  leave (player: Player) {
    const index = this.players.findIndex(x => x.player.getID() === player.getID())
    if (index < 0) {
      return
    }

    this.players.splice(index, 1)
  }

  startGame () {
    this.board.initialize()
  }

  addPlay (playerWithTeam: PlayerWithTeam, pos: BoardPosition): boolean {
    return this.board.addPlay(playerWithTeam.player, pos, playerWithTeam.team)
  }
}

export namespace RoomList {
  const RoomList: Array<Room> = new Array()
  RoomList.push(new Room(LOBBY))

  export function getLobby (): Room {
    return RoomList[0]
  }

  export function getRoom (id: string): Room | null {
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
