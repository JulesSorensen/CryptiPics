import fetch from '@utils/fetch'
import { ApiFilters } from 'types/nestjs.types'

const iamEndPoint = `${process.env.IAM_URL}`

const endPoints = {
  users: `${iamEndPoint}/users`,
  login: `${iamEndPoint}/auth/login`,
  myAccount: `${iamEndPoint}/my-account`,
  updatePassword: `${iamEndPoint}/my-account/update-password`,
  lostPassword: `${iamEndPoint}/lost-password`,
  updateLostPassword: `${iamEndPoint}/update-lost-password`
}

export interface User {
  id: number
  email: string
  roles: string[]
  enabled: boolean
}

export interface ILoginResponse {
  access_token: string
  user: User
}

export const login = (email: string, password: string): Promise<ILoginResponse> => 
  fetch(endPoints.login, 'post', {
    username: email,
    password
  })

interface UserFilters extends ApiFilters {}

export const fetchUsers = (filters?: UserFilters) => fetch(endPoints.users, 'get', filters)

export interface UserPayload extends Omit<User, 'id'> {
  password: string
}

export const createUser = (data: UserPayload) => fetch(endPoints.users, 'post', data)

export const updateUser = (id: number, data: Partial<UserPayload>) => fetch(`${endPoints.users}/${id}`, 'put', data)

export const deleteUser = (id: number) => fetch(`${endPoints.users}/${id}`, 'delete')

export interface MyAccountPayload {
  email: string
  firstname: string
  lastname: string
  phone: string
}

export const fetchMyAccountData = (): Promise<MyAccountPayload> => fetch(endPoints.myAccount, 'get')
export const updateMyAccountData = (data: MyAccountPayload) => fetch(endPoints.myAccount, 'post', data)

export interface UpdatePasswordPayload {
  currentPassword: string
  password: string
  confirmPassword: string
}

export const updateMyPassword = (data: UpdatePasswordPayload) => fetch(endPoints.updatePassword, 'post', data)

export const lostPassword = (email: string) => fetch(endPoints.lostPassword, 'post', { email })
export const updateLostPassword = (password: string) => fetch(endPoints.updateLostPassword, 'post', { password })