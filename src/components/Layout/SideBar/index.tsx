import { getTranslation } from '@src/languages'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import sidebar from './sidebar'

interface SideBarProps {
  isOpen: boolean
  toggleSideBar: () => void
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, toggleSideBar }) => {
  const location = useLocation()

  return (
    <div className="flex">
      <div
        className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-20 transition-opacity
        bg-black opacity-50 lg:hidden`}
        onClick={toggleSideBar}
      ></div>
      <div
        className={`${isOpen ? '-translate-x-0 ease-out' : '-translate-x-full ease-in'
          } fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300
        transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <img src="img/logo/cryptipics.png" alt="logo cryptipics" width={250} />
          </div>
        </div>
        <nav className="mt-10">
          {sidebar.map(item => {
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                aria-current="page"
                to={item.path}
                className={`${isActive
                    ? 'flex flex-row align-middle router-link-active router-link-exact-active bg-gray-600 bg-opacity-25 text-gray-100 border-l-4'
                    : 'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'
                  } flex items-center px-6 py-2 mt-4 duration-200 border-gray-100`}
              >
                <span className='flex flex-row align-middle mr-2'>{item.icon && item.icon()}</span>
                {getTranslation('sideMenu')[item.name]}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default SideBar
