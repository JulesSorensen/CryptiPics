import { useEffect, useMemo, useState } from 'react'
import feathers from '@feathersjs/client'
import socketio from '@feathersjs/socketio-client'
import getSocketClient from '@utils/socket'
import { Application } from '@feathersjs/feathers'

type TSocketListeners = (feathersClient: Application<any>) => void

const useFeathersSocketClient = ({
  path,
  url,
  listeners,
  timeout
}: {
  path: string
  url?: string
  listeners?: TSocketListeners
  timeout?: number
}) => {
  const configuration = useMemo(() => {
    const socket = getSocketClient(url ? url : (process.env.API_URL as string), path)
    const app: any = feathers()

    app.configure(socketio(socket, { timeout: timeout ? timeout : 30000 }))
    const storageKey = (url == process.env.QM_URL) ? "jwt_token" : "feathers-jwt";
    app.configure(
      feathers.authentication({
        storage: window.localStorage,
        storageKey: storageKey,
        jwtStrategy: 'jwt'
      })
    )

    return { app, socket }
  }, [])

  useEffect(() => {
    if (listeners) {
      listeners(configuration.app)
    }
    configuration.app.reAuthenticate()

    return () => {
      configuration.socket.disconnect()
    }
  }, [])

  return configuration.app
}

export default useFeathersSocketClient
