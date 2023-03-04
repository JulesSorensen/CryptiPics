import io from 'socket.io-client'

const getSocketClient = (url: string, path: string) => {
  const socket = io(url, {transports: ['websocket', 'polling', 'flashsocket']})

  return socket
}

export default getSocketClient