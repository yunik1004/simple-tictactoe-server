import { isUndefined } from 'util'

export class Player {
  static numPlayer: number = 0

  readonly id: number
  readonly name: string

  constructor (name: string) {
    this.id = Player.numPlayer++
    this.name = name
  }
}

export namespace PlayerList {
  const PlayerList: Array<Player> = new Array(0)

  export function getPlayer (id: number): Player | null {
    const player = PlayerList.find(x => x.id === id)
    if (isUndefined(player)) {
      return null
    }
    return player
  }

  export function getPlayers (): Array<Player> {
    return PlayerList
  }

  export function addPlayer (name: string): Player {
    const player = new Player(name)
    PlayerList.push(player)
    return player
  }
}
