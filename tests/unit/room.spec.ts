import io from 'socket.io-client'
import { TESTPORT_ROOM, TESTURI } from '../constants'
import { RoomList } from '../../src/model/room'
import { server } from '../../src/app'
import { LOBBY } from '../../src/constants'

beforeEach((done) => {
  server.listen(TESTPORT_ROOM, () => {
    done()
  })
})

afterEach((done) => {
  server.close(() => {
    done()
  })
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
    socket.on('createRoomSuccess', (id: string) => {
      const roomList = RoomList.getRoomsWithoutLobby()
      expect(roomList.length).toEqual(1)
      expect(roomList[0].id).toEqual(id)
      expect(roomList[0].name).toEqual(roomName)
      socket.disconnect()
    })
    socket.on('createRoomFail', () => {
      done.fail(`Couldn't create new room`)
    })
    socket.on('disconnect', () => {
      done()
    })
  })

  test('Room deletion when exits', (done) => {
    const socket = io.connect(TESTURI(TESTPORT_ROOM))
    const roomName = 'testRoom'
    socket.on('connect', () => {
      socket.emit('createRoom', roomName)
    })
    socket.on('createRoomSuccess', (id: string) => {
      socket.emit('leaveRoom')
    })
    socket.on('createRoomFail', () => {
      done.fail(`Couldn't create new room`)
    })
    socket.on('leaveRoomSuccess', () => {
      expect(RoomList.getRooms().length).toEqual(1)
      socket.disconnect()
    })
    socket.on('leaveRoomFail', () => {
      done.fail(`Couldn't leave current room`)
    })
    socket.on('disconnect', () => {
      done()
    })
  })
})
