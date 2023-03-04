import io from 'socket.io-client'
import feathers from '@feathersjs/client'

const getSocketClient = (endPoint: string) => {
  const socket = io(process.env.API_URL as string, {
    path: `/${endPoint}`
  })

  const client: any = feathers()

  client.configure(feathers.socketio(socket))
  client.configure(
    feathers.authentication({
      storage: window.localStorage,
      storageKey: 'feathers-jwt',
      jwtStrategy: 'jwt'
    })
  )

  return client
}


export default getSocketClient