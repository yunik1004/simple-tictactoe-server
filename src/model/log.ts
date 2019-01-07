import { Play } from './play'
import { Player } from './player'

export class LogEntry {
  readonly turn: number
  readonly player: Player
  readonly play: Play

  constructor (turn: number, player: Player, play: Play) {
    this.turn = turn
    this.player = player
    this.play = play
  }
}
