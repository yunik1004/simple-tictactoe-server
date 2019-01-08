import { server } from './app'
import { PORT } from './constants'

server.listen(PORT, () => {
  console.log('Server is listening to port ' + PORT)
})
