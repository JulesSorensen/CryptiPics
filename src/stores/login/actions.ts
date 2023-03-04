import { persistKey } from './../persist'
import { ILoginResponse } from '@services/iam'
import { setJwtToken, deleteJwtToken } from '@utils/session'
import { destroy } from '@utils/storage'

export enum EActionTypes {
  SET_LOGIN = 'SET_LOGIN',
  LOGOUT = 'LOGOUT',
}

export type LoginPayload = {
  [EActionTypes.SET_LOGIN]: ILoginResponse
  [EActionTypes.LOGOUT]: undefined
}

export const setLogin = (response: ILoginResponse) => {
  setJwtToken(response.access_token)

  return {
    type: EActionTypes.SET_LOGIN,
    payload: response
  }
}

export const logout = () => {
  deleteJwtToken()
  destroy(persistKey)

  return {
    type: EActionTypes.LOGOUT
  }
}
