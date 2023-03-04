import jwtDecode from 'jwt-decode'
import * as storage from './storage'

export const setJwtToken = (jwtToken: string) => storage.save('jwt_token', jwtToken)
export const getJwtToken = () => storage.get('jwt_token')
export const deleteJwtToken = () => storage.destroy('jwt_token')

export const getUserStored = () => storage.get('user')
export const setUserStored = (user: any) => storage.save('user', user)
export const deleteUserStored = () => storage.destroy('user')

export const getUser = () => {
  try {
    const token = getJwtToken()
    const tokenDecoded: any = jwtDecode(token)
    return tokenDecoded
  } catch (error) {
    return undefined
  }
}
