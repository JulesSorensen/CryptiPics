import { useEffect } from 'react'
import { save, get } from '@utils/storage'

export const persistKey = 'store_persist'

export function applyPersistToInitialState<S extends {}>(initialState: S): S {
  const clone = Object.assign({}, initialState)

  const persistedStore = get(persistKey)

  if (!persistedStore) {
    return initialState
  }

  return Object.keys(persistedStore).reduce((result, key) => {
    return { ...result, [key]: persistedStore[key] }
  }, clone)
}

export function usePersist<S extends {}>(store: S, whitelist: string[], isConnected: boolean) {
  useEffect(
    () => {
      if (isConnected) {
        const persistObject = whitelist.reduce((result, key) => {
          return {
            ...result,
            [key]: store[key as keyof S]
          }
        }, {})

        save(persistKey, persistObject)
      }
    },
    Object.keys(store)
      .filter(key => whitelist.includes(key))
      .map(key => {
        return store[key as keyof S]
      })
  )
}
