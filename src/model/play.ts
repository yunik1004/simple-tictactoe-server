import { LogEntry } from './log'
import { Player } from './player'

export type BoardPosition = [number, number]

export enum Mark {
  Empty,
  O,
  X
}

export type Play = {
  pos: BoardPosition
  mark: Mark
}

export class Board {
  readonly size: BoardPosition
  private board: number[][]
  private log: Array<LogEntry>
  private turn: number

  constructor (size: BoardPosition = [3, 3]) {
    this.size = size
    this.board = new Array()
    for (let i = 0; i < this.size[0]; i++) {
      for (let j = 0; j < this.size[1]; j++) {
        this.board[i][j] = Mark.Empty
      }
    }
    this.log = new Array()
    this.turn = 1
  }

  getLog (): Array<LogEntry> {
    return this.log
  }

  addPlay (player: Player, play: Play): boolean {
    // Check that it is player's turn

    // Check whether play is correct
    for (let i = 0; i < 2; i++) {
      if (play.pos[i] < 0 || play.pos[i] >= this.size[i]) {
        return false
      }
    }

    this.board[play.pos[0]][play.pos[1]] = play.mark

    this.log.push(new LogEntry(this.turn++, player, play))
    return true
  }
}
