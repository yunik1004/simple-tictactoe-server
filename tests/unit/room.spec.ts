import io from 'socket.io-client'
import { TESTPORT_ROOM, TESTURI } from '../constants'
import { RoomList } from '../../src/model/room'
import { server } from '../../src/app'
import { LOBBY } from '../../src/constants'

beforeEach(async () => {
  await server.listen(TESTPORT_ROOM)
})

afterEach(async () => {
  await server.close()
})

describe('Room Test', () => {
  test('Lobby creation', () => {
    expect(RoomList.getRooms().length).toEqual(1)
    const lobby = RoomList.getLobby()
    expect(lobby.name).toEqual(LOBBY)
  })

  test('Room creation', (done) => {
    const socket = io.connect(TESTURI(TESTPORT_ROOM))
    const roomName = 'testRoom'
    socket.on('connect', () => {
      socket.emit('createRoom', roomName)
    })
    socket.on('createRoomSuccess', () => {
      socket.disconnect()
    })
    socket.on('createRoomFail', () => {
      socket.disconnect()
    })
    socket.on('disconnect', () => {
      done()
    })
  })
})
