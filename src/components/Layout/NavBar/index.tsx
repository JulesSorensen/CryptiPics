import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import useDarkModeSwitch from '@hooks/useDarkModeSwitch'
import routes from '@routes'
import LanguageSelector from '@src/components/LanguageSelector'
import { useStore } from '@stores/index'
import { logout } from '@stores/login/actions'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

interface NavBarProps {
  toggleSideBar: () => void
}

const NavBar: React.FC<NavBarProps> = ({ toggleSideBar }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const {
    state: {
      login: { currentUser }
    },
    dispatch
  } = useStore()

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const initials = currentUser
    ? `${currentUser.firstname ? currentUser.firstname.charAt(0) : ''}${currentUser.firstname ? currentUser.lastname.charAt(0) : ''
      }`.toUpperCase()
    : ''

  const onLogOut = () => {
    toast.success('Vous avez été déconnecté avec succès')
    dispatch(logout())
  }

  const { darkModeEnabled, onSwitchDarkMode } = useDarkModeSwitch()

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-700 border-b-4 border-primary">
      <div className="flex items-center">
        <button className="text-gray-500 focus:outline-none" onClick={toggleSideBar}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>

      <div className="flex">
        <LanguageSelector />

        <div
          className="mr-3 flex items-center justify-center cursor-pointer text-slate-700 dark:text-slate-300"
          onClick={onSwitchDarkMode}
        >
          {darkModeEnabled ? <SunIcon className="w-8 h-8" /> : <MoonIcon className="w-8 h-8" />}
        </div>

        <div className="flex items-center">
          <div className="relative" onClick={toggleUserMenu}>
            <button className="relative z-10 w-10 h-10 rounded-full shadow focus:outline-none flex justify-center items-center bg-primary-dark">
              <span className="text-white">{initials}</span>
            </button>

            <div className={`${isUserMenuOpen ? '' : 'hidden'} fixed inset-0 z-10 w-full h-full`}></div>
            <div
              className={`${isUserMenuOpen ? '' : 'hidden'
                } absolute right-0 z-20 w-48 mt-2 bg-white dark:bg-slate-700  rounded-md overflow-hidden shadow-xl`}
            >
              <Link
                to={routes.MY_ACCOUNT}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-primary hover:text-white dark:hover:text-slate-700"
              >
                Mon Compte
              </Link>
              <div
                className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-primary hover:text-white dark:hover:text-slate-700 cursor-pointer"
                onClick={onLogOut}
              >
                Déconnexion
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
