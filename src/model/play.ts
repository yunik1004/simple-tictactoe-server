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
  private size: BoardPosition
  private board: number[][]
  private log: Array<LogEntry>
  private turn: number

  constructor () {
    this.size = [-1, -1]
    this.board = new Array()
    this.log = new Array()
    this.turn = -1
  }

  initialize (size: BoardPosition = [3, 3]) {
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

  addPlay (player: Player, pos: BoardPosition, team: Mark): boolean {
    // Check that it is player's turn

    // Check whether play is correct
    for (let i = 0; i < 2; i++) {
      if (pos[i] < 0 || pos[i] >= this.size[i]) {
        return false
      }
    }

    // If not empty position
    if (this.board[pos[0]][pos[1]] !== Mark.Empty) {
      return false
    }

    const newPlay: Play = { pos: pos, mark: team }

    this.board[pos[0]][pos[1]] = newPlay.mark

    this.log.push(new LogEntry(this.turn++, player, newPlay))
    return true
  }
}
