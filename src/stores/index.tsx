import React, { createContext, useContext, useReducer } from 'react'
import loginReducer, { initialState as loginInitialState, ILoginState, LoginActionTypes } from './login/reducer'
import { usePersist, applyPersistToInitialState } from './persist'

interface IStore {
  login: ILoginState
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type ActionTypes = LoginActionTypes

interface IContextProps {
  state: IStore
  dispatch: React.Dispatch<any>
}

const StoreContext = createContext({} as IContextProps)

interface IStoreProvider {
  children: React.ReactNode
}

const mainReducer = ({ login }: IStore, action: any) => ({
  login: loginReducer(login, action),
})

export const StoreProvider: React.FC<IStoreProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(
    mainReducer,
    applyPersistToInitialState({
      login: loginInitialState,
    })
  )

  usePersist<IStore>(state, ['login'], state.login.currentUser !== null)

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
