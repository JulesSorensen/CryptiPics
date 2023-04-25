import routes from '@routes'
import { useStore } from '@stores/index'
import { logout } from '@stores/login/actions'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthWrapperProps {
  children: React.ReactNode
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const {
    state: {
      login: { currentUser }
    },
    dispatch
  } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    // Vérifier la date d'expiration du Token
    const isTokenExpired = false

    if (!currentUser || isTokenExpired) {
      if (isTokenExpired) {
        dispatch(logout())
      }
    }
  }, [currentUser])

  return <>{children}</>
}

export default AuthWrapper
