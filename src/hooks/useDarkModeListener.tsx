import { darkModeListener } from '@utils/darkMode'
import { useEffect, useState } from 'react'

const useDarkModeListener = (onDarkModeEnabled?: () => void, onDarkModeDisabled?: () => void) => {
  const [isDarkModeActive, setIsDarkModeActive] = useState<boolean>(localStorage.getItem('dark_mode') === 'true')

  const onChange = (enabled: boolean) => {
    setIsDarkModeActive(enabled)

    if (enabled && onDarkModeEnabled) {
      onDarkModeEnabled()
    } else if (!enabled && onDarkModeDisabled) {
      onDarkModeDisabled()
    }
  }

  useEffect(() => {
    const observer = darkModeListener(onChange)

    return () => {
      observer.disconnect()
    }
  }, [])

  return {
    active: isDarkModeActive
  }
}

export default useDarkModeListener
