import io from 'socket.io-client'
import { server } from '../../src/app'
import { TESTPORT } from '../../src/constants'

const testURI = 'http://localhost:' + TESTPORT

beforeEach((done) => {
  server.listen(TESTPORT, () => {
    done()
  })
})

afterEach((done) => {
  server.close(() => {
    done()
  })
})

describe('SocketIO communication', () => {
  test('Connection', (done) => {
    const socket = io.connect(testURI)
    socket.on('connect', () => {
      socket.disconnect()
    })
    socket.on('disconnect', () => {
      done()
    })
  })
})
