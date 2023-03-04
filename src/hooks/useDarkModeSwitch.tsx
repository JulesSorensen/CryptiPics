import { useEffect, useState } from 'react'

const useDarkModeSwitch = () => {
  const initDarkModeEnabled = () => {
    const savedSetting = localStorage.getItem('dark_mode')

    if (savedSetting === null) {
      const userDefaultSettingValue = window.matchMedia('(prefers-color-scheme: dark)').matches

      localStorage.setItem('dark_mode', userDefaultSettingValue.toString())

      return userDefaultSettingValue
    } else {
      return JSON.parse(savedSetting)
    }
  }

  const [darkModeEnabled, setDarkModeEnabled] = useState(initDarkModeEnabled())

  useEffect(() => {
    const htmlTag = document.querySelector('html')

    if (htmlTag) {
      if (darkModeEnabled) {
        htmlTag.classList.add('dark')
      } else {
        htmlTag.classList.remove('dark')
      }
    }
  }, [darkModeEnabled])

  const onSwitchDarkMode = () => {
    const newValue = !darkModeEnabled

    setDarkModeEnabled(newValue)
    localStorage.setItem('dark_mode', newValue.toString())
  }

  return {
    darkModeEnabled,
    onSwitchDarkMode
  }
}

export default useDarkModeSwitch
