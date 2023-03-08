import NavBar from '@components/Layout/NavBar'
import React, { useState } from 'react'
import AuthWrapper from '../AuthWrapper'
import SideBar from '../SideBar'

interface NavContainerProps {
  children: React.ReactChild
  searchBarComponent?: React.ReactNode
}

const NavContainer: React.FC<NavContainerProps> = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  const toggleSideBar = () => {
    console.log('toggleSideBar');
    
    setIsSideBarOpen(!isSideBarOpen)
  }

  return (
    <AuthWrapper>
      <div className="flex h-screen bg-gray-200 font-roboto">
        <SideBar isOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <NavBar toggleSideBar={toggleSideBar} />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-slate-800 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-800">
            <div className="container h-full mx-auto px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
    </AuthWrapper>
  )
}

export default NavContainer
