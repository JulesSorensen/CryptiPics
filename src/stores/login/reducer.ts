import { ActionMap } from './../index'
import { EActionTypes, LoginPayload } from './actions'
import { IUser } from '@services/iam'

export type LoginActionTypes = ActionMap<LoginPayload>[keyof ActionMap<LoginPayload>]

export interface ILoginState {
  currentUser: IUser | null
}

export const initialState: ILoginState = {
  currentUser: null
}


const reducer = (state: ILoginState, action: LoginActionTypes): ILoginState => {
  switch (action.type) {
    case EActionTypes.SET_LOGIN:
      return {
        ...state,
        currentUser: action.payload.user
      }

    case EActionTypes.LOGOUT:
      return {
        ...state,
        currentUser: null
      }

    default:
      return {
        ...state
      }
  }
}

export default reducer
