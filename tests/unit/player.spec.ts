import io from 'socket.io-client'
import { TESTPORT_PLAYER, TESTURI } from '../constants'
import { RoomList } from '../../src/model/room'
import { server } from '../../src/app'

beforeEach(async () => {
  await server.listen(TESTPORT_PLAYER)
})

afterEach(async () => {
  await server.close()
})

describe('Player Test', () => {
  test('Connection', (done) => {
    const socket = io.connect(TESTURI(TESTPORT_PLAYER))
    socket.on('connect', () => {
      const playerList = RoomList.getLobby().getPlayersJSON()
      // Only one player exists
      expect(playerList.length).toEqual(1)
      expect(playerList[0].id).toEqual(socket.id)
      socket.disconnect()
    })
    socket.on('disconnect', () => {
      done()
    })
  })
})
