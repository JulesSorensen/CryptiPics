import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import useDarkModeSwitch from '@hooks/useDarkModeSwitch'
import React from 'react'

const DarkModeSwitch: React.FC = () => {
  const { darkModeEnabled, onSwitchDarkMode } = useDarkModeSwitch()

  return (
    <div
      className="flex items-center justify-center cursor-pointer text-slate-700 dark:text-slate-300"
      onClick={onSwitchDarkMode}
    >
      {darkModeEnabled ? <SunIcon className="w-8 h-8" /> : <MoonIcon className="w-8 h-8" />}
    </div>
  )
}

export default DarkModeSwitch
