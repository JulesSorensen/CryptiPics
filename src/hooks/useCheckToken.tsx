import { useEffect } from 'react'
import { getJwtToken } from '@utils/session'
import jwtDecode from 'jwt-decode'

const useCheckToken = (handleTokenExpiration: () => void) => {
  try {
    const token = getJwtToken()

    const tokenDecoded: any = jwtDecode(token)

    const timestamp = new Date().getTime()
    const { exp } = tokenDecoded
    const expirationTimeStamp = exp * 1000

    if (expirationTimeStamp <= timestamp) {
      throw Error
    }
    return tokenDecoded
  } catch (error) {
    handleTokenExpiration()
  }
}

export default useCheckToken
