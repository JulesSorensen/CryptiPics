import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import useDarkModeSwitch from '@hooks/useDarkModeSwitch'
import routes from '@routes'
import LanguageSelector from '@src/components/LanguageSelector'
import { useStore } from '@stores/index'
import { logout } from '@stores/login/actions'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

  const navigate = useNavigate()

  const toggleUserMenu = () => {
    if (!currentUser) navigate(routes.LOGIN)
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const initials = currentUser
    ? `${currentUser.firstname ? currentUser.firstname.charAt(0) : ''}${currentUser.firstname ? currentUser.lastname.charAt(0) : ''}`.toUpperCase()
    : false

  const onLogOut = () => {
    toast.success('Vous avez été déconnecté avec succès')
    dispatch(logout())
  }

  const { darkModeEnabled, onSwitchDarkMode } = useDarkModeSwitch()

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-700 border-b-4 border-primary">
      <div className="flex items-center space-x-5">
        <button className="text-gray-500 focus:outline-none" onClick={toggleSideBar}>
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <Link to={routes.HOME}>
        <img src="./img/logo/cp.png" alt="CP Logo" className='h-8' />
        </Link>
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
            {currentUser ? (
              <button className="relative z-10 w-10 h-10 rounded-full shadow focus:outline-none flex justify-center items-center bg-primary-dark">
                <span className="text-white">{initials}</span>
              </button>
            ) : (
              <svg className='w-8 h-8 fill-red-500/50' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L353.3 251.6C407.9 237 448 187.2 448 128C448 57.3 390.7 0 320 0C250.2 0 193.5 55.8 192 125.2L38.8 5.1zM264.3 304.3C170.5 309.4 96 387.2 96 482.3c0 16.4 13.3 29.7 29.7 29.7H514.3c3.9 0 7.6-.7 11-2.1l-261-205.6z"/></svg>
            )}

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
